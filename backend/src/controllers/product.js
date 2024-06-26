const APIError = require('../utils/error');
const {
    dataInMemory: frozenData,
    getMultiObjectSubset,
    getObjectSubset,
    limitArray,
    sortArray,
    updateDataToFile,
    generateUniqueId,
    getJsonFileContent,
    loadDataInMemory
} = require('../utils/util');
const {readFileContent} = require('../utils/fileUtils');
const MongoDB = require("../db/MongoDB");
const db = new MongoDB();
const controller = {};

// get all products
controller.getAllProducts = async (req, res) => {
    const {limit, skip, select, sortBy, order} = req._options || {};
    try {
        await db.fetchAll('products', (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: 'Failed to fetch products',
                    success: false,
                    status: 500
                });
            }
            const total = result.length;

            let products = sortArray(result, sortBy, order);

            if (skip > 0) {
                products = products.slice(skip);
            }
            products = limitArray(products, limit);
            if (select) {
                products = getMultiObjectSubset(products, select);
            }
            console.log(products);
            console.log(total);
            res.status(200).json({
                products: products,
                message: '',
                success: true,
                status: 200,
                total: total,
                skip: skip,
                limit: products.length
            });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Failed to fetch products',
            success: false,
            status: 500
        });
    }
};

// search products
controller.searchProducts = _options => {
    const {limit, skip, select, q: searchQuery, sortBy, order} = _options;

    let products = frozenData.products.filter(p => {
        return (
            p.title.toLowerCase().includes(searchQuery) ||
            p.description.toLowerCase().includes(searchQuery)
        );
    });
    const total = products.length;

    products = sortArray(products, sortBy, order);

    if (skip > 0) {
        products = products.slice(skip);
    }

    products = limitArray(products, limit);

    if (select) {
        products = getMultiObjectSubset(products, select);
    }

    return {products, total, skip, limit: products.length};
};

// get product category list
controller.getProductCategoryList = () => {
    return frozenData.categoryList;
};

// get product categories
controller.getProductCategories = () => {
    return frozenData.categories;
};

// get product by id
controller.getProductById = async (req, res) => {
    // {
    //     id, select
    // }  const { id } = req.params;
    //   const { _options } = req;
    //   const select = _options && _options.select;
    //   res.send(getProductById({ id, select }));
    const {id} = req.params;
    // if (select) {
    //     product = getObjectSubset(product, select);
    // }
    try {
        await db.findById(id, 'products', (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: `Product with id '${id}' not found`,
                    success: false,
                    status: 404
                });
            }
            console.log(result);
            res.status(200).json({
                product: result,
                message: '',
                success: true,
                status: 200,
            });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Failed to fetch products',
            success: false,
            status: 500
        });
    }
};

// get products by categoryName
controller.getProductsByCategoryName = ({categoryName = '', ..._options}) => {
    const {limit, skip, select, sortBy, order} = _options;

    let products = frozenData.products.filter(
        p => p.category.toLowerCase() === categoryName.toLowerCase(),
    );
    const total = products.length;

    products = sortArray(products, sortBy, order);

    if (skip > 0) {
        products = products.slice(skip);
    }

    products = limitArray(products, limit);

    if (select) {
        products = getMultiObjectSubset(products, select);
    }

    return {products, total, skip, limit: products.length};
};

// add new product
controller.addNewProduct = async (req, res) => {
    const {
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type
    } = req.body;
    const newProduct = {
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type
    };
    await db.save(newProduct, 'products', (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Failed to create product',
                success: false,
                status: 500
            });
        }
        newProduct.id = result.insertedId;
        delete newProduct._id;
        res.status(201).json({
            product: newProduct,
            message: 'Created product',
            success: true,
            status: 201
        });
    });
};

// update product by id
controller.updateProductById = async (req, res) => {
    const {
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type
    } = req.body;
    const updateProduct = {
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type
    };
    const {id} = req.params;

    await db.updateProduct(id, 'products', updateProduct, (err) => {
        if (err) {
            return res.status(500).json({
                message: 'Failed to update product',
                success: false,
                status: 500
            });
        }
        updateProduct.id = +id;
        delete updateProduct._id;
        res.status(200).json({
            message: 'Product updated',
            product: updateProduct,
            success: true,
            status: 200
        });
    });
};

// delete product by id
controller.deleteProductById = async (req, res) => {
    const {id} = req.params;
    try {
        await db.deleteById(id, 'products', (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: `Failed to delete product with id '${id}': ${err.message}`,
                    success: false,
                    status: 500
                });
            }
            res.status(200).json({
                message: `Product with id '${id}' has been deleted successfully.`,
                success: true,
                status: 200
            });
        });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({
            message: error.message,
            success: false,
            status: error.status || 500
        });
    }
};

module.exports = controller;
