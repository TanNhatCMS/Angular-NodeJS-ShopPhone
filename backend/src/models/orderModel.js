const mongoose = require('mongoose');

const DeliveryStatusSchema = new mongoose.Schema({
    status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    updatedAt: { type: Date, default: Date.now }
});

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
    deliveryStatus: [DeliveryStatusSchema], // Trạng thái giao hàng
    deliveryTime: { type: Date }, // Thời gian giao hàng
    notes: { type: String }, // Ghi chú
    createdAt: { type: Date, default: Date.now }, // Thời gian tạo đơn hàng
    updatedAt: { type: Date, default: Date.now } // Thời gian cập nhật đơn hàng
});

class OrderModel {
    constructor() {
        this.model = mongoose.model('Order', OrderSchema);
    }

    async createOrder(data) {
        const order = new this.model(data);
        return await order.save();
    }

    async getOrderById(id) {
        return await this.model.findById(id)
            .populate('user', 'username email')
            .populate({
                path: 'cart',
                populate: {
                    path: 'products.product',
                    select: 'name price'
                }
            })
            .exec();
    }

    async updateOrder(id, data) {
        data.updatedAt = Date.now();
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async deleteOrder(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }

    async getAllOrders() {
        return await this.model.find()
            .populate('user', 'username email')
            .populate({
                path: 'cart',
                populate: {
                    path: 'products.product',
                    select: 'name price'
                }
            })
            .exec();
    }

    async addDeliveryStatus(id, status) {
        return await this.model.findByIdAndUpdate(id, { $push: { deliveryStatus: { status, updatedAt: Date.now() } } }, { new: true }).exec();
    }
}

module.exports = new OrderModel();
