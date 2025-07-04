const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post');

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
router.post('/', upload.single('media'), async (req, res) => {
  try {
    const { content, mediaType } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: 'No media file provided' });

    const post = new Post({
      content,
      mediaUrl: `/uploads/${file.filename}`,
      mediaType,
      // createdBy: req.userId, // if auth
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
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

module.exports = router;
