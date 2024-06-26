const express = require('express');
const {AddProduct, deleteProduct, updateProduct, getProducts, getProduct} = require("../controllers/productController");
const router = express.Router();

router.get('/', function(req, res, next) {
    req.redirect('/');
});
//get all products
router.get('/Products', getProducts);
//get a product
router.get('/Products/:productId', getProduct);
//add a product
router.post('/Products',AddProduct)
//delete a product
router.delete('/Products/:productId', deleteProduct);
//update a product
router.put('/Products/:productId', updateProduct);
module.exports = router;
