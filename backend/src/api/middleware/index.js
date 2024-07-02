const { isValidObjectId } = require('mongoose');
const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers');
const User = require('../models/Users');
const multer = require('multer');
const path = require('path');
const { v4 : uuidv } = require('uuid');

const { JWT_SECRET } = process.env;

const middleware = {};

const storage  = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, path.resolve("tmp")); // Thư mục lưu trữ file
    },
    filename: (req, file, cb) => {
        const uniquePrefix = `${uuidv()}`;
        const filename = uniquePrefix + '-' +  file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, filename);
    },
});

const fileFilter = (req, file, cb) => {
    // Chấp nhận các loại file cụ thể (ví dụ: chỉ cho phép .jpeg và .png)
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Chỉ chấp nhận file hình ảnh định dạng .jpeg và .png'), false);
    }
};

middleware.upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5  // Giới hạn kích thước file: 5MB
    },
    fileFilter: fileFilter,
});



middleware.isValidId = (req, res, next) => {
    const id = req.params.contactId;
    if (!isValidObjectId(id)) {
        return next(HttpError(404, `${id} not valid id`));
    }
    next();
}

middleware.isEmptyBody = (req, res, next) => {
    const { length } = Object.keys(req.body);
    if (!length) {
        return next(HttpError(400, "Body must have fields"));
    }
    next();
}

middleware.isEmptyBodyFavorite = (req, res, next) => {
    const { length } = Object.keys(req.body);
    if (!length) {
        return next(HttpError(400, "missing field favorite"));
    }
    next();
}

middleware.authenticate = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return next(HttpError(401, "Truy cập bị từ chối: Ủy quyền không xác định"));
    }
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        return next(HttpError(401));
    }

    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id);
        if (!user || !user.token || token !== user.token) {
            return next(HttpError(401));
        }
        req.user = user;
        next();
    } catch (error) {
        next(HttpError(401, error.message));
    }
};

module.exports = middleware;
