const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/user.model');

// Multer configuration for profile images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profiles/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

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

// Get user profile
router.get('/profile/:userId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-password -blockedUsers');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is blocked
    const requestingUser = await User.findById(req.user._id);
    if (requestingUser.blockedUsers.includes(user._id)) {
      return res.status(403).json({ message: 'Cannot view this profile' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.patch('/profile', auth, upload.single('profileImage'), async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'email', 'bio', 'isCreator'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    updates.forEach(update => req.user[update] = req.body[update]);

    if (req.file) {
      req.user.profileImage = req.file.path;
    }

    await req.user.save();
    res.json(req.user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Change password
router.post('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Verify current password
    const isMatch = await req.user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    req.user.password = newPassword;
    await req.user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Block/Unblock user
router.post('/block/:userId', auth, async (req, res) => {
  try {
    const userToBlock = await User.findById(req.params.userId);
    
    if (!userToBlock) {
      return res.status(404).json({ message: 'User not found' });
    }

    const blockIndex = req.user.blockedUsers.indexOf(userToBlock._id);
    
    if (blockIndex === -1) {
      req.user.blockedUsers.push(userToBlock._id);
    } else {
      req.user.blockedUsers.splice(blockIndex, 1);
    }

    await req.user.save();
    res.json(req.user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Follow/Unfollow user
router.post('/follow/:userId', auth, async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.userId);
    
    if (!userToFollow) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is blocked
    if (userToFollow.blockedUsers.includes(req.user._id)) {
      return res.status(403).json({ message: 'Cannot follow this user' });
    }

    const followIndex = req.user.following.indexOf(userToFollow._id);
    
    if (followIndex === -1) {
      req.user.following.push(userToFollow._id);
      userToFollow.followers.push(req.user._id);
    } else {
      req.user.following.splice(followIndex, 1);
      const followerIndex = userToFollow.followers.indexOf(req.user._id);
      userToFollow.followers.splice(followerIndex, 1);
    }

    await Promise.all([req.user.save(), userToFollow.save()]);
    res.json(req.user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user's followers
router.get('/followers', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('followers', 'username profileImage');
    res.json(user.followers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's following
router.get('/following', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('following', 'username profileImage');
    res.json(user.following);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 