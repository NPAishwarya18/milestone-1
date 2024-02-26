const express = require('express');
const mongoose = require('mongoose');
const foodRoutes = require('./Food');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Use foodRoutes for /api/foods
app.use('/api/foods', foodRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
