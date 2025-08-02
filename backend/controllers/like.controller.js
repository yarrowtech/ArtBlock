const Like = require('../models/Like');

// Toggle like/unlike for a post
exports.toggleLike = async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;
  try {
    const existing = await Like.findOne({ userId, postId });
    if (existing) {
      await Like.deleteOne({ _id: existing._id });
      return res.json({ liked: false });
    } else {
      await Like.create({ userId, postId });
      return res.json({ liked: true });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to toggle like' });
  }
};

// Get like count and if current user liked
exports.getLikeStatus = async (req, res) => {
  const userId = req.user?._id;
  const { postId } = req.params;
  try {
    const count = await Like.countDocuments({ postId });
    let liked = false;
    if (userId) {
      liked = !!(await Like.findOne({ userId, postId }));
    }
    return res.json({ count, liked });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to get like status' });
  }
};
