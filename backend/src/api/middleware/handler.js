const {HttpError, apiError} = require('../helpers');

handler = {};

handler.errorMiddleware = function (err, req, res, next) {
    if (err instanceof apiError) {
        const {message, status, errors, data} = err;
        const response = {
            success: false,
            status: status || 500,
            message: message || 'Internal Server Error',
            errors: errors || null
        };
        if (data) {
            response.data = null;
        }
        if (process.env.NODE_ENV === 'development') {
            response.stack = err.stack
        }
        return res.status(response.status).json(response);
    }

    // Xử lý lỗi HTTP (nếu cần thiết)
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({
            success: false,
            status: err.statusCode,
            message: err.message,
            ...(process.env.NODE_ENV === 'development' ? {stack: err.stack} : {})
        });
    }

    // Xử lý các lỗi khác
    const statusCode = err.statusCode || 500; // Sử dụng statusCode của lỗi nếu có, mặc định là 500
    return res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' ? {stack: err.stack} : {})
    });
}
handler.handlerResponse = function ( callback, status = 200, message = '', data = null, additionalProps = {}) {
    const response = {
        success: true,
        status: status,
        message: message,
        data: data,
        ...additionalProps,
    };
    return res.status(status).json(response);
}

module.exports = handler;
