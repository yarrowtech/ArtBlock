const express = require('express');
const router = express.Router();
const Subscription = require('../models/subscription.model');
const User = require('../models/user.model');

// Middleware to check if user is authenticated
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate.' });
  }
};

// Subscribe to a creator
router.post('/:creatorId', auth, async (req, res) => {
  try {
    const creator = await User.findById(req.params.creatorId);
    
    if (!creator || !creator.isCreator) {
      return res.status(404).json({ message: 'Creator not found' });
    }

    // Check if subscription already exists
    const existingSubscription = await Subscription.findOne({
      subscriber: req.user._id,
      creator: creator._id
    });

    if (existingSubscription && existingSubscription.status === 'active') {
      return res.status(400).json({ message: 'Already subscribed to this creator' });
    }

    const { amount } = req.body;
    
    // Calculate subscription end date (1 month from now)
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    const subscription = new Subscription({
      subscriber: req.user._id,
      creator: creator._id,
      amount,
      endDate,
      paymentHistory: [{
        amount,
        paymentDate: new Date(),
        status: 'success'
      }]
    });

    await subscription.save();
    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user's active subscriptions
router.get('/my-subscriptions', auth, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      subscriber: req.user._id,
      status: 'active'
    }).populate('creator', 'username profileImage');

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get creator's subscribers
router.get('/my-subscribers', auth, async (req, res) => {
  try {
    if (!req.user.isCreator) {
      return res.status(403).json({ message: 'Only creators can view their subscribers' });
    }

    const subscriptions = await Subscription.find({
      creator: req.user._id,
      status: 'active'
    }).populate('subscriber', 'username profileImage');

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel subscription
router.post('/:subscriptionId/cancel', auth, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.subscriptionId,
      subscriber: req.user._id,
      status: 'active'
    });

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    subscription.status = 'cancelled';
    await subscription.save();

    res.json(subscription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Renew subscription
router.post('/:subscriptionId/renew', auth, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      _id: req.params.subscriptionId,
      subscriber: req.user._id
    });

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    const { amount } = req.body;

    // Calculate new end date (1 month from now)
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    subscription.status = 'active';
    subscription.endDate = endDate;
    subscription.amount = amount;
    subscription.paymentHistory.push({
      amount,
      paymentDate: new Date(),
      status: 'success'
    });

    await subscription.save();
    res.json(subscription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 