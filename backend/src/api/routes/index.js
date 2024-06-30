const router = require('express').Router();

// static resource routes
const authRoutes = require('./auth');
const productsRoutes = require('./product');

// dynamic resource routes

// no-dynamic-routes
router.use('/auth', authRoutes);
router.use(['/products', '/product'], productsRoutes);
module.exports = router;
