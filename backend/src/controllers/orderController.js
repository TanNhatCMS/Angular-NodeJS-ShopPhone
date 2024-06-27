const OrderModel = require('../models/orderModel');
const CartModel = require('../models/cartModel');
const UserModel = require('../models/userModel');

const OrderController = {};
// Create a new order
OrderController.CreateOrder = async (req, res) => {
    try {
        const {user, cart, deliveryTime, notes} = req.body;
        // Validate user and cart existence
        const userExists = await UserModel.getUserById(user);
        const cartExists = await CartModel.getCartById(cart);
        if (!userExists || !cartExists) {
            return res.status(400).json({
                message: 'Invalid user or cart ID',
                status: 400,
                success: false
            });
        }

        const newOrder = {
            user,
            cart,
            deliveryStatus: [{status: 'Pending'}],
            deliveryTime,
            notes
        };

        const order = await OrderModel.createOrder(newOrder);
        res.status(201).json({
            payload: order,
            message: `Order created successfully with ID: ${order._id}`,
            status: 201,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 500,
            success: false
        });
    }
};

// Get all orders
OrderController.GetAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.getAllOrders();
        res.status(200).json({
            payload: orders,
            message: 'All orders retrieved successfully',
            status: 200,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 500,
            success: false
        });
    }
};

// Get order by ID
OrderController.GetOrderByID = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await OrderModel.getOrderById(id);
        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        }
        res.status(200).json({
            payload: order,
            message: `Get order ${order.id} successfully`,
            status: 200,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 500,
            success: false
        });
    }
};

// Update an order
OrderController.UpdateOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedOrder = await OrderModel.updateOrder(id, req.body);

        if (!updatedOrder) {
            return res.status(404).json({
                message: `Order ${id} not found`,
                status: 404,
                success: false
            });
        }

        res.status(200).json({
            payload: updatedOrder,
            message: `Order ${id} updated`,
            status: 200,
            success: true
        }

        );
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 500,
            success: false
        });
    }
};

// Delete an order
OrderController.DeleteOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedOrder = await OrderModel.deleteOrder(id);
        if (!deletedOrder) {
            return res.status(404).json({
                message: `Order ${id} not found`,
                status: 404,
                success: false
            });
        }

        res.status(200).json({
            message: `Order ${id} deleted successfully`,
            status: 200,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 500,
            success: false
        });
    }
};

// Add delivery status to an order
OrderController.AddDelivery = async (req, res) => {
    try {
        const {status} = req.body;
        if (!status) {
            return res.status(400).json({
                message: 'Delivery status is required',
                status: 400,
                success: false
            });
        }
        const id = req.params.id;
        const updatedOrder = await OrderModel.addDeliveryStatus(id, status);

        if (!updatedOrder) {
            return res.status(404).json({
                message: `Order ${id} not found`,
                status: 404,
                success: false
            });
        }
        res.status(200).json({
            payload: updatedOrder,
            message: `Delivery ${id} status added successfully`,
            status: 200,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: 500,
            success: false
        });
    }
};

module.exports = OrderController;
