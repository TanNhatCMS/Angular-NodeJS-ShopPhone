const ModelProduct = require("../models/modelProduct");
const db = require("../models/database/db"); // assuming you export your db instance from this file
const modelProduct = new ModelProduct(db);

exports.AddProduct = (req, res) => {
    modelProduct.save(req.body, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Failed to create product',
                success: false,
                status: 500
            });
        }
        res.status(201).json({
            message: 'Created product',
            success: true,
            status: 201
        });
    });
};

exports.getProducts = (req, res) => {
    try {
        modelProduct.fetchAll((err, products) => {
            if (err) {
                return res.status(500).json({
                    message: 'Failed to fetch products',
                    success: false,
                    status: 500
                });
            }
            res.status(200).json({
                products: products,
                message: 'Fetched products',
                success: true,
                status: 200,
                total: products.length
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to fetch products. error: ' + err,
            products: [],
            success: false,
            status: 500,
            total: 0
        });
    }
};

exports.getProduct = (req, res) => {
    const productId = req.params.productId;
    modelProduct.findById(productId, (err, product) => {
        if (err) {
            return res.status(err.status).json({
                message: err.message,
                success: err.success,
                status: err.status
            });
        }
        res.status(200).json(product);
    });
};

exports.deleteProduct = (req, res) => {
    const productId = req.params.productId;
    modelProduct.deleteById(productId, (err, result) => {
        if (err) {
            return res.status(err.status).json({
                message: err.message,
                success: err.success,
                status: err.status
            });
        }
        res.status(result.status).json({
            message: result.message,
            success: result.success,
            status: result.status
        });
    });
};

exports.updateProduct = (req, res) => {
    const productId = req.params.productId;
    const body = req.body;
    modelProduct.updateProduct(productId, body, (err) => {
        if (err) {
            return res.status(500).json({
                message: 'Failed to update product',
                success: false,
                status: 500
            });
        }
        res.status(200).json({
            message: 'Product updated',
            success: true,
            status: 200
        });
    });
};
