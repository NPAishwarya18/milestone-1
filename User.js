import mongoose from 'mongoose';

//const mongoose = require('mongoose');


// Define schema for user collection
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  profile_picture: { type: String },
  roles: { type: [String], default: ['user'] }
});

// Create a model for the user collection
const User = mongoose.model('User', userSchema);

// Save user details from Gmail into the collection
const saveUserDetails = async (email, name, profilePicture) => {
  try {
    const user = new User({
      email: email,
      name: name,
      profile_picture: profilePicture
    });
    await user.save();
    console.log('User details saved successfully.');
  } catch (error) {
    console.error('Error saving user details:', error);
  }
};
/*const saveUserDetails = async (email, name, profilePicture) => {
  try {
    const user = new User({
      email: email,
      name: name,
      profile_picture: profilePicture
    });
    await user.save();
    console.log('User details saved successfully.');
  } catch (error) {
    console.error('Error saving user details:', error);
  }
};
*/