const express = require('express');
const compression = require('compression');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const {HttpError} = require("../helpers");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const { JWT_SECRET } = process.env;

const middleware = {};
middleware.injectMiddleWares = (app)=> {
  // enable compression.
  app.use(compression());
  // enable CORS.
  app.use(cors());
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', ['Content-Type', 'Authorization'])
    next()
  })
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(cookieParser());
  app.use(bodyParser.json())
  app.use(logger('dev'));

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
middleware.isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    return next(HttpError(400, "Body must have fields"));
  }
  next();
}

module.exports = middleware;
