const mongoose = require('mongoose');
const Product = require('./models/productModel');
const User = require('./models/userModel');
const Cart = require('./models/cartModel');
const {MONGODB_URI, MONGODB_DB_NAME} = process.env;
class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose.connect(MONGODB_URI, {dbName: MONGODB_DB_NAME, useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('Database connection successful');
            })
            .catch(err => {
                console.error('Database connection error');
            });
    }

    async createUser(data) {
        const user = new User(data);
        return await user.save();
    }

    async createProduct(data) {
        const product = new Product(data);
        return await product.save();
    }

    async createCart(data) {
        const cart = new Cart(data);
        return await cart.save();
    }

    async getUserById(id) {
        return await User.findById(id);
    }

    async getProductById(id) {
        return await Product.findById(id);
    }

    async getCartByUserId(userId) {
        return await Cart.findOne({ user: userId }).populate('products');
    }

    // Add more methods as needed
}

module.exports = new Database();
