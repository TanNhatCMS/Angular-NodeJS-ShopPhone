const router = require('express').Router();
const staticRoutes = require('./static');
const authRoutes = require('./auth');
const productsRoutes = require('./product');
const testRoutes = require('./test');
const usersRoutes = require('./users');

router.use('/', staticRoutes);
router.use('/test', testRoutes);
router.use('/auth', authRoutes);
router.use(['/product', '/products'], productsRoutes);
router.use(['/user', '/users'], usersRoutes);
module.exports = router;
