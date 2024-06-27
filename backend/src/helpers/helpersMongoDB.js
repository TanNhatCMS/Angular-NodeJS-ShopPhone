const helpersMongoDB = {};

helpersMongoDB.verifyInput = (data, allowId = true) => {
    if (Array.isArray(data)) {
        return data.map(item => {
            if (!item._id && item.id !== undefined && !allowId) {
                item._id = String(item.id);
            }
            if (item.id) {
                delete item.id;
            }
            return item;
        });
    } else {
        if (!data._id && data.id !== undefined && !allowId) {
            data._id = String(data.id);
        }
        if (data.id) {
            delete data.id;
        }
        return data;
    }
}

helpersMongoDB.verifyOutput = (data) =>{
    console.log(`Data is of type: ${typeof data}`)
    if (Array.isArray(data)) {
        return data.map(item => {
            if(item.id !== undefined){
                delete item.id;
            }
            const id = item._id.toString();
            delete item._id;
            return {
                id: id,
                ...item
            };
        });
    } else {
        if(data.id !== undefined){
            delete data.id;
        }
        const id = data._id.toString();
        delete data._id;
        data.id = id;
        return {
            id: id,
            ...data
        };
    }
};

module.exports = helpersMongoDB;
