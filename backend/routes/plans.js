const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');

// Create a new membership plan
router.post('/', async (req, res) => {
  try {
    const plan = new Plan(req.body);
    const savedPlan = await plan.save();
    res.status(201).json(savedPlan);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create plan' });
  }
});

// Get all plans
router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch plans' });
  }
});

module.exports = router;
