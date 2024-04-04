// routes/users.js

const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();

// Create user
router.post('/', async (req, res) => {
  try {
    let { name, email, password, picture, role } = req.body;
    const newUser = new User({ name, email, password, picture, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (e) {
    if (e.code === 11000) {
      res.status(400).json({ error: 'User already exists' });
    } else {
      console.error(e);
      res.status(500).json({ error: 'Failed to register user.' });
    }
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    user.status = 'online';
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// Get all users
router.get('/all', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user data
router.put('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    let updates = req.body;

    // Check if the email is being updated and if it already exists in the database
    if (updates.email) {
      const existingUser = await User.findOne({ email: updates.email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    // Check if the password is being updated
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(updates.password, salt);
      updates.password = hash;
    }

    const user = await User.findByIdAndUpdate(userId, updates, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove password from the response
    user.password = undefined;

    // Send success message along with the updated user data
    res.status(200).json({ message: 'User updated successfully', user: user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ message: error.message });
  }
});


// Delete user
router.delete('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
