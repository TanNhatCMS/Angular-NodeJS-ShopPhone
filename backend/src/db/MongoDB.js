const { MongoClient, ObjectId } = require('mongodb');
const {isDbConnected, updatedDbConnectionStatus} = require('../utils/db');
const APIError = require("../utils/error");

const url = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

class MongoDB {
    static async connect() {
        try {
            const client = await MongoClient.connect(url);
            console.info('[Service:Database] Connected.');
            updatedDbConnectionStatus(true);
            return client.db(dbName);
        }catch(err) {
            updatedDbConnectionStatus(false);
            console.error('[Service:Database] Err: Failed to Connect.', err);
            process.exit(1);
        }
    }

    async save(data,name, cb) {
        const db = await MongoDB.connect();
        data._id = new ObjectId();
        delete data.id;
        try {
            const result = await db.collection(name).insertOne(data);
            cb(null, result);
        } catch (err) {
            cb(err,null);
        }
    }

    async fetchAll(name, cb) {
        const db = await MongoDB.connect();
        try {
            const products = await db.collection(name).find().toArray();
            const modifiedProducts = products.map(product => {
                const id = product._id.toString();
                delete product._id;
                return {
                    id: id,
                    ...product
                };
            });
            cb(null, modifiedProducts);
        } catch (err) {
            cb(err);
        }
    }

    async findById(id,name, cb) {
        if (!id || id.length !== 24) {
            return cb({
                status: 400,
                message: 'Invalid product ID'
            });
        }
        const db = await MongoDB.connect();
        try {
            const result = await db.collection(name).findOne({ _id: new ObjectId(id) });
            if (!result) {
                return cb({
                    status: 404,
                    message: 'Product not found'
                });
            }
            const modifiedProduct = {
                id: result._id.toString(),
                ...result,
                _id: undefined
            };
            cb(null,  modifiedProduct);
        } catch (err) {
            cb(err);
        }
    }

    async deleteById( id, name, cb) {
        if (!id || id.length !== 24) {
            return cb({
                status: 400,
                message: 'Invalid product ID'
            });
        }
        const db = await MongoDB.connect();
        try {
            const product = await db.collection(name).findOne({ _id: new ObjectId(id) });
            if (!product) {
                console.log(`Product $id ${id} not found`)
                throw new APIError(`Product $id ${id} not found`, 404);
            }
            const result = await db.collection(name).deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount === 0) {
                console.log(`Failed to delete product $id ${id}`)
                throw new APIError(`Failed to delete product $id ${id}`, 500);
            }
            return cb(null);//true
        } catch (error) {
            console.error(error);
            throw new APIError('Internal server error', 500);
        }
    }

    async updateProduct(id,name, updated, cb) {
        if (!id || id.length !== 24) {
            return cb({
                status: 400,
                message: 'Invalid product ID'
            });
        }
        const db = await MongoDB.connect();
        delete updated.id;
        try {
            const result = await db.collection(name).updateOne({ _id: new ObjectId(id) }, { $set: updated });
            cb(null, result);
        } catch (err) {
            cb(err);
        }
    }
}
module.exports = MongoDB;
