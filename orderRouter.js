// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { scheduleOTPConfirmation } = require('../otpScheduler'); // Import the OTP scheduler

// Route to place an order
router.post('/place-order', async (req, res) => {
  try {
    const { foodId, userId } = req.body;
    // Generate a unique order ID (You can implement your own logic here)
    const orderId = generateOrderId();
    // Create the order with the provided details
    const order = new Order({ foodId, userId, orderId });
    // Save the order to the database
    await order.save();
    // Schedule OTP confirmation interval for this order
    scheduleOTPConfirmation(order._id); // Pass the order ID to scheduleOTPConfirmation function
    // Send success response
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
