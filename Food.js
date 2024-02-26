import Food from './models/Food.js';
//const Food = require('./models/Food');

const createFood = async (name, description, price, image) => {
  try {
    const food = new Food({
      name: name,
      description: description,
      price: price,
      image: image
    });
    await food.save();
    console.log('Food item created successfully.');
  } catch (error) {
    console.error('Error creating food item:', error);
  }
};

createFood('Pizza', 'Delicious pizza with cheese and toppings.', 10.99, 'https://example.com/pizza.jpg');
