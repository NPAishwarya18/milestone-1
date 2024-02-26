// foodOrderChart.js

const Order = require('./models/Order');
const Food = require('./models/Food');
const axios = require('axios');

// Function to aggregate daily food orders and send webhook
const generateDailyFoodOrderChart = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of day
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Get start of next day

    // Aggregate food orders for today
    const dailyFoodOrders = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: today, $lt: tomorrow }
        }
      },
      {
        $group: {
          _id: '$foodId',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'foods',
          localField: '_id',
          foreignField: '_id',
          as: 'food'
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Get the most ordered food for today
    const mostOrderedFood = dailyFoodOrders[0];
    if (mostOrderedFood) {
      const foodName = mostOrderedFood.food[0].name;
      const count = mostOrderedFood.count;

      // Send information using webhook
      await sendWebhook(foodName, count);
    }
  } catch (error) {
    console.error('Error generating daily food order chart:', error);
  }
};

// Function to send information using webhook
const sendWebhook = async (foodName, count) => {
  try {
    const webhookURL = 'YOUR_WEBHOOK_URL';
    const message = `The most ordered food today is ${foodName} with ${count} orders.`;

    await axios.post(webhookURL, { message });
    console.log('Webhook sent successfully.');
  } catch (error) {
    console.error('Error sending webhook:', error);
  }
};

// Schedule the script to run daily
setInterval(generateDailyFoodOrderChart, 24 * 60 * 60 * 1000); // Run every 24 hours

// Call the function immediately when starting the application
generateDailyFoodOrderChart();
