const APIError = require('../utils/error');
const helpers = {};
const messageList = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    500: "Internal Server Error",
};

helpers.HttpError = (status, message = messageList[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}
helpers.apiError = (status, message = messageList[status], errors, data = false ) => {
    return new APIError(message, status, errors, data);
}
module.exports = helpers;
