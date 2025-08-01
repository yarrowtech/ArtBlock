const User = require('../models/user.model');

// Fetch all users with role = 'creator'
const getAllCreators = async (req, res) => {
  try {
    const creators = await User.find({ role: 'creator' }).select(
      'name bio profilePhoto createdAt'
    );

    // Sort by creation date for "new creators"
    const sortedByNew = [...creators].sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json({
      featuredCreators: creators, // Just show all for now
      newCreators: sortedByNew.slice(0, 10), // Top 10 newest creators
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to fetch creators', error: error.message });
  }
};

module.exports = { getAllCreators };
