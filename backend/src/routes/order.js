const express = require('express');
const router = express.Router();
const {
    CreateOrder,
    GetAllOrders,
    GetOrderByID,
    UpdateOrder,
    DeleteOrder,
    AddDelivery,
} = require('../controllers/orderController');

// Create a new order
router.post('/orders', CreateOrder);

// Get all orders
router.get('/orders', GetAllOrders);

// Get order by ID
router.get('/orders/:id', GetOrderByID);

// Update an order
router.put('/orders/:id', UpdateOrder);

// Delete an order
router.delete('/orders/:id', DeleteOrder);

// Add delivery status to an order
router.post('/orders/:id/status',AddDelivery);

module.exports = router;
