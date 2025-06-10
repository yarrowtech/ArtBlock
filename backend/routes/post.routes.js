const express = require('express');
const router = express.Router();
const multer = require('multer');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const Subscription = require('../models/subscription.model');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
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

// Create a new post
router.post('/', auth, upload.single('media'), async (req, res) => {
  try {
    const { title, description, isExclusive, tags } = req.body;
    
    if (!req.user.isCreator) {
      return res.status(403).json({ message: 'Only creators can post content' });
    }

    const post = new Post({
      creator: req.user._id,
      title,
      description,
      mediaUrl: req.file.path,
      mediaType: req.file.mimetype.startsWith('image/') ? 'image' : 'video',
      isExclusive,
      tags: tags ? JSON.parse(tags) : []
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all public posts
router.get('/public', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ isExclusive: false })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('creator', 'username profileImage');

    const total = await Post.countDocuments({ isExclusive: false });

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get posts for feed (including subscribed content)
router.get('/feed', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get creators user is subscribed to
    const subscriptions = await Subscription.find({
      subscriber: req.user._id,
      status: 'active'
    });
    const subscribedCreators = subscriptions.map(sub => sub.creator);

    // Get posts that are either public or from subscribed creators
    const posts = await Post.find({
      $or: [
        { isExclusive: false },
        {
          creator: { $in: subscribedCreators },
          isExclusive: true
        }
      ]
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('creator', 'username profileImage');

    const total = await Post.countDocuments({
      $or: [
        { isExclusive: false },
        {
          creator: { $in: subscribedCreators },
          isExclusive: true
        }
      ]
    });

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific post
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('creator', 'username profileImage');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user has access to exclusive content
    if (post.isExclusive) {
      const subscription = await Subscription.findOne({
        subscriber: req.user._id,
        creator: post.creator._id,
        status: 'active'
      });

      if (!subscription) {
        return res.status(403).json({ message: 'Subscription required to view this content' });
      }
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a post
router.patch('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      creator: req.user._id
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'isExclusive', 'tags'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    updates.forEach(update => post[update] = req.body[update]);
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      creator: req.user._id
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Like/Unlike a post
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const likeIndex = post.likes.indexOf(req.user._id);
    
    if (likeIndex === -1) {
      post.likes.push(req.user._id);
    } else {
      post.likes.splice(likeIndex, 1);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a comment to a post
router.post('/:id/comment', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({
      user: req.user._id,
      content
    });

    await post.save();
    
    const populatedPost = await Post.findById(post._id)
      .populate('comments.user', 'username profileImage');
    
    res.json(populatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 