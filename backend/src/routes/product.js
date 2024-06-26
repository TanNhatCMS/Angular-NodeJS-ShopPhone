const express = require('express');
const {
  getAllProducts,
  getProductById,
  searchProducts,
  getProductCategoryList,
  getProductCategories,
  getProductsByCategoryName,
  addNewProduct,
  updateProductById,
  deleteProductById,
} = require('../controllers/product');
const router = express.Router();


// get all products
router.get('/', getAllProducts);


// search product
router.get('/search', (req, res) => {
  res.send(searchProducts({ ...req._options }));
});

// get product category list
router.get('/category-list', (req, res) => {
  res.send(getProductCategoryList());
});

// get product categories
router.get('/categories', (req, res) => {
  res.send(getProductCategories());
});

// get product by id
router.get('/:id', getProductById);

// get products by categoryName
router.get('/category/:categoryName', (req, res) => {
  const { categoryName } = req.params;
  res.send(getProductsByCategoryName({ categoryName, ...req._options }));
});

// add new product
router.post('/',addNewProduct);

// update product by id (PUT)
router.put('/:id', updateProductById);

// update product by id (PATCH)
router.patch('/:id', (req, res) => {
  const { id } = req.params;

  res.send(updateProductById({ id, ...req.body }));
});

// delete product by id
router.delete('/:id', deleteProductById);

module.exports = router;
