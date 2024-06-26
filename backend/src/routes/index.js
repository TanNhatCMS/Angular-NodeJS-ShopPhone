const router = require('express').Router();
const forceHTTPS = require('../middleware/forceHTTPS');

// static page routes
const staticRoutes = require('./static');

// static resource routes
const authRoutes = require('./auth');
const apiRouter = require("./api");
const adminRouter = require("./admin");
const shopRouter = require("./shop");
const cartRoutes = require('./cart');
const commentRoutes = require('./comment');
const postRoutes = require('./post');
const productRoutes = require('./product');
const quoteRoutes = require('./quote');
const recipeRoutes = require('./recipe');
const todoRoutes = require('./todo');
const userRoutes = require('./user');
const httpStatusRoutes = require('./http');
const testRoutes = require('./test');
//const imageRoutes = require('./image');
const iconRoutes = require('./icon');

// dynamic resource routes
// no-dynamic-routes

router.use('/', forceHTTPS, staticRoutes);
router.use('/auth', authRoutes);
router.use(['/cart', '/carts'], cartRoutes);
router.use(['/comment', '/comments'], commentRoutes);
router.use(['/post', '/posts'], postRoutes);
router.use(['/product', '/products'], productRoutes);
router.use(['/quote', '/quotes'], quoteRoutes);
router.use(['/recipe', '/recipes'], recipeRoutes);
router.use(['/todo', '/todos'], todoRoutes);
router.use(['/user', '/users'], userRoutes);
router.use(['/http', '/https'], httpStatusRoutes);
router.use('/test', testRoutes);
//router.use(['/image', '/i'], imageRoutes);
router.use('/icon', iconRoutes);
router.use('/api', apiRouter);
router.use('/admin', adminRouter);
router.use('/shop', shopRouter);
module.exports = router;
