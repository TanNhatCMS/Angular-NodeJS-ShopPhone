const handleSaveError = function (error, data, next) {
    const {name, code} = error;
    error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
    next();
}

const addUpdateSettings = function (next) {
    this.setOptions({
        runValidators: true,
        new: true
    });
    next();
}
module.exports = {handleSaveError, addUpdateSettings};
