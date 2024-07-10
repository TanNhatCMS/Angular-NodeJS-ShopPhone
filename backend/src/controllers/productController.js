const {apiError} = require('../helpers');
const {ctrlWrapper} = require('../decorators');
const Product = require('../models/Products');

async function getAllProducts(req, res, next) {
    const products = await Product.find({isDeleted: false}, "-createdAt -updatedAt -isDeleted -deletedAt");
    if (!products.length) {
        throw apiError(
            404,
            "No Product found"
        );
    }
    res.status(200).json(products);
}


async function getProductByID(req, res, next) {
    const {id: _id} = req.params;
    const product = await Product.findOne({_id});
    if (product) {
        res.status(200).json(product);
    } else {
        throw apiError(404, "Product not found");
    }
}

async function getProductBySlug(req, res, next) {
    const {slug: slug} = req.params;
    const product = await Product.findOne({slug});
    if (product) {
        res.status(200).json(product);
    } else {
        throw apiError(404, "Product not found");
    }
}

async function createProduct(req, res, next) {
    const {_id: owner, role} = req.user;
    if (!owner && role !== 'admin') {
        throw apiError(401, "Unauthorized");
    }
    const newContact = await Product.create({...req.body, owner});
    res.status(201).json(newContact);
}

async function deleteProduct(req, res, next) {
    const {id: _id} = req.params;
    const {_id: owner, role} = req.user;
    if (!owner && role !== 'admin') {
        throw apiError(401, "Unauthorized");
    }
    const deleteProduct = await Product.findOneAndDelete({_id});
    if (deleteProduct) {
        res.json({message: "Product deleted"});
    } else {
        throw apiError(404);
    }
}

async function updateProduct(req, res, next) {
    const {id: _id} = req.params;
    const {_id: owner} = req.user;
    const updatedProduct = await Product.findOneAndUpdate(
        {_id, owner},
        req.body,
        {
            new: true,
        }
    );
    if (!updatedProduct) {
        throw apiError(404, "Not found");
    }
    res.json(updatedProduct);
}

module.exports = {
    getAllProducts: ctrlWrapper(getAllProducts),
    getProductByID: ctrlWrapper(getProductByID),
    getProductBySlug: ctrlWrapper(getProductBySlug),
    createProduct: ctrlWrapper(createProduct),
    deleteProduct: ctrlWrapper(deleteProduct),
    updateProduct: ctrlWrapper(updateProduct),
};
