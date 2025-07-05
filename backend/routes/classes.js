const express = require('express');
const router = express.Router();
const Class = require('../models/Class');

// Create a live class
router.post('/', async (req, res) => {
  try {
    const newClass = new Class(req.body);
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create class' });
  }
});

// Get all classes
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find().sort({ date: 1 });
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch classes' });
  }
});

module.exports = router;
