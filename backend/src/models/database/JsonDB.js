const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename), '../data', 'Products.json');

const readFileContent = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb(null, []);
        }
        try {
            fileContent = JSON.parse(fileContent);
        } catch (err) {
            return cb(null, []);
        }
        cb(null, fileContent);
    });
};

const writeFileContent = (data, cb) => {
    fs.writeFile(p, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return cb(err);
        }
        cb(null);
    });
};

class JsonDB {
    save(product, cb) {
        product.id = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
        readFileContent((err, products) => {
            if (err) {
                return cb(err);
            }
            products.push(product);
            writeFileContent(products, (err) => {
                if (err) {
                    return cb(err);
                }
                cb(null, { insertedId: product.id });
            });
        });
    }

    fetchAll(cb) {
        readFileContent((err, products) => {
            if (err) {
                return cb(err);
            }
            cb(null, products);
        });
    }

    findById(id, cb) {
        if (!id || id.length < 1) {
            return cb({
                status: 400,
                message: 'Invalid product ID',
                success: false
            });
        }
        readFileContent((err, products) => {
            if (err) {
                return cb(err);
            }
            const product = products.find(p => p.id === id);
            if (!product) {
                return cb({
                    status: 404,
                    message: 'Product not found',
                    success: false
                });
            }
            cb(null, {
                status: 200,
                product: product,
                message: 'Product found',
                success: true
            });
        });
    }

    deleteById(id, cb) {
        if (!id || id.length < 1) {
            return cb({
                status: 400,
                message: 'Invalid product ID',
                success: false
            });
        }
        readFileContent((err, products) => {
            if (err) {
                return cb(err);
            }
            const updatedProducts = products.filter(p => p.id !== id);
            writeFileContent(updatedProducts, (err) => {
                if (err) {
                    return cb({
                        status: 500,
                        message: 'Failed to delete product',
                        success: false
                    });
                }
                cb(null, {
                    status: 200,
                    message: 'Product deleted',
                    success: true
                });
            });
        });
    }

    updateProduct(id, updatedProduct, cb) {
        if (!id || id.length < 1) {
            return cb({
                status: 400,
                message: 'Invalid product ID',
                success: false
            });
        }
        readFileContent((err, products) => {
            if (err) {
                return cb(err);
            }
            const productIndex = products.findIndex(p => p.id === id);
            if (productIndex === -1) {
                return cb({
                    status: 404,
                    message: 'Product not found',
                    success: false
                });
            }
            products[productIndex] = { ...products[productIndex], ...updatedProduct };
            writeFileContent(products, (err) => {
                if (err) {
                    return cb(err);
                }
                cb(null, {
                    status: 200,
                    message: 'Product updated',
                    success: true
                });
            });
        });
    }
}

module.exports = JsonDB;
