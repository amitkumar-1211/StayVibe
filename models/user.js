const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, 'First name is required'] },

  lastName: { type: String, default: '' },

  email: { type: String, required: [true, 'Email is required'], unique: true },

  password: { type: String, required: [true, 'Password is required'] },
  
  userType: { type: String, enum: ['guest', 'host'], required: [true, 'User type is required'] },
});

module.exports = mongoose.model('User', userSchema);
