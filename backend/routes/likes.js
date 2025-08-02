const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth.middleware');
const likeController = require('../controllers/like.controller');

// Toggle like/unlike (POST /api/likes/:postId)
router.post('/:postId', auth, likeController.toggleLike);

// Get like count and if current user liked (GET /api/likes/:postId)
router.get('/:postId', auth, likeController.getLikeStatus);

module.exports = router;
