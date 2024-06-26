const express = require('express');
const router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('shop', { title: 'Shop Phone' });
});
module.exports = router;
