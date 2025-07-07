const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // Exclude password
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all creators
router.get('/role/creator', async (req, res) => {
  try {
    const creators = await User.find({ role: 'creator' }).select('username profilePhoto bio _id');
    res.status(200).json(creators);
  } catch (err) {
    console.error('Error fetching creators:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
