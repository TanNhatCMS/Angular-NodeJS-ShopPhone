const { MongoClient, ObjectId } = require('mongodb');

const url = process.env.MONGODB_URL;
const dbName = process.env.MONGODB_DATABASE;

class MongoDB {
    static async connect() {
        const client = await MongoClient.connect(url);
        return client.db(dbName);
    }

    async save(product, cb) {
        const db = await MongoDB.connect();
        product._id = new ObjectId();
        delete product.id;
        try {
            const result = await db.collection('products').insertOne(product);
            cb(null, result);
        } catch (err) {
            cb(err);
        }
    }

    async fetchAll(cb) {
        const db = await MongoDB.connect();
        try {
            const products = await db.collection('products').find().toArray();
            const modifiedProducts = products.map(product => {
                return {
                    id: product._id.toString(),
                    ...product,
                    _id: undefined
                };
            });
            cb(null, modifiedProducts);
        } catch (err) {
            cb(err);
        }
    }

    async findById(id, cb) {
        if (!id || id.length !== 24) {
            return cb({
                status: 400,
                message: 'Invalid product ID',
                success: false
            });
        }
        const db = await MongoDB.connect();
        try {
            const product = await db.collection('products').findOne({ _id: new ObjectId(id) });
            if (!product) {
                return cb({
                    status: 404,
                    message: 'Product not found',
                    success: false
                });
            }
            const modifiedProduct = {
                id: product._id.toString(),
                ...product,
                _id: undefined // remove the _id field
            };
            cb(null, {
                status: 200,
                product: modifiedProduct,
                message: 'Product found',
                success: true
            });
        } catch (err) {
            cb(err);
        }
    }

    async deleteById(id, cb) {
        if (!id || id.length !== 24) {
            return cb({
                status: 400,
                message: 'Invalid product ID',
                success: false
            });
        }
        const db = await MongoDB.connect();
        try {
            const product = await db.collection('products').findOne({ _id: new ObjectId(id) });
            if (!product) {
                return cb({
                    status: 404,
                    message: 'Product not found',
                    success: false
                });
            }
            const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount === 0) {
                return cb({
                    status: 500,
                    message: 'Failed to delete product',
                    success: false
                });
            }
            return cb(null, {
                status: 200,
                message: 'Product deleted',
                success: true
            });
        } catch (error) {
            console.error(error);
            return cb({
                status: 500,
                message: 'Internal server error',
                success: false
            });
        }
    }
    async updateProduct(id, updatedProduct, cb) {
        if (!id || id.length !== 24) {
            return cb({
                status: 400,
                message: 'Invalid product ID',
                success: false
            });
        }
        const db = await MongoDB.connect();
        delete updatedProduct.id;
        try {
            const result = await db.collection('products').updateOne({ _id: new ObjectId(id) }, { $set: updatedProduct });
            cb(null, result);
        } catch (err) {
            cb(err);
        }
    }
}
module.exports = MongoDB;
