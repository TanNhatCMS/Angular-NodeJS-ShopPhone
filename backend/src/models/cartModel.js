const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    city: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String, required: true },
    street: { type: String, required: true }
});

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 } // Số lượng sản phẩm, mặc định là 1
    }],
    customerInfo: {
        gender: { type: String }, // Giới tính của khách hàng
        address: [AddressSchema] // Địa chỉ nhận hàng
    },
    discountCode: { type: String }, // Mã giảm giá
    discountAmount: { type: Number }, // Số tiền giảm giá
    totalPrice: { type: Number } // Tổng tiền đơn hàng
});

class CartModel {
    constructor() {
        this.model = mongoose.model('Cart', CartSchema);
    }

    async createCart(data) {
        const cart = new this.model(data);
        return await cart.save();
    }

    async getCartById(id) {
        return await this.model.findById(id)
            .populate('user', 'username') // Populate thông tin người dùng chỉ lấy username
            .populate('products.product', 'name price'); // Populate thông tin sản phẩm chỉ lấy tên và giá
    }

    async updateCart(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async deleteCart(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }

    async getAllCarts() {
        return await this.model.find()
            .populate('user', 'username')
            .populate('products.product', 'name price');
    }
}

module.exports = new CartModel();
