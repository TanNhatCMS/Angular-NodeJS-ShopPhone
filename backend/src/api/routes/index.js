const router = require('express').Router();

// static resource routes
const authRoutes = require('./auth');


// dynamic resource routes

// no-dynamic-routes
router.use('/auth', authRoutes);

module.exports = router;
