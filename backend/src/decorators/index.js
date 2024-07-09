const {HttpError} = require('../helpers');

const decorators = {};

decorators.ctrlWrapper = (ctrl) => {
    return async (req, res, next) => {
        try {
            await ctrl(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

decorators.validateBody = (schema) => {
    return (req, res, next) => {
        const {error} = schema.validate(req.body);
        if (error) {
            return next(HttpError(400, error.message));
        }
        next();
    };
};

module.exports = decorators;
