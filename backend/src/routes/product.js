const router = require('express').Router();
const {validateBody} = require('../decorators');
const { getAllProducts , createProduct, getProductByID, getProductBySlug, updateProduct, deleteProduct} = require('../controllers/productController');
const {isEmptyBody, authenticate, upload} = require('../middleware');



router.get("/", getAllProducts);

router.get("/slug/:slug", getProductBySlug);

router.get("/:id", getProductByID);

router.post(
    "/",
    authenticate,
    createProduct
);

// Update a user
router.put('/:id', authenticate, updateProduct);

// Delete a user
router.delete('/:id', authenticate, deleteProduct);

module.exports = router;
