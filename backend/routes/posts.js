const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post');
const { auth } = require('../middlewares/auth.middleware');

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const upload = multer({ storage });

// POST /api/posts — create post
router.post('/', auth, upload.single('media'), async (req, res) => {
  try {
    const { content, mediaType, category } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: 'No media file provided' });
    if (!category || !['art', 'music', 'dance', 'podcast'].includes(category)) {
      return res.status(400).json({ error: 'Invalid or missing category' });
    }
    const post = new Post({
      content,
      mediaUrl: `/uploads/${file.filename}`,
      mediaType,
      category,
      createdBy: req.user._id, // ✅ from middleware
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// GET /api/posts — fetch all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('createdBy', 'username profilePhoto role');

    const creatorPosts = posts.filter(post => post.createdBy?.role === 'creator');

    const formattedPosts = creatorPosts.map(post => ({
      _id: post._id,
      caption: post.content,
      mediaUrl: post.mediaUrl.startsWith('http') ? post.mediaUrl : `http://localhost:5000${post.mediaUrl}`,
      mediaType: post.mediaType,
      createdAt: post.createdAt,
      username: post.createdBy?.username || 'Unknown',
      profilePhoto: post.createdBy?.profilePhoto
        ? `http://localhost:5000/${post.createdBy.profilePhoto.replace(/\\/g, '/')}`
        : null,
      creatorId: post.createdBy?._id,
    }));

    res.json(formattedPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});


// GET /api/posts/creator/:id
router.get('/creator/:id', async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.params.id }).sort({
      createdAt: -1,
    });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch creator posts' });
  }
});

// DELETE a post by ID (no auth)
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
