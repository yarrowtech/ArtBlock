// backend/controllers/explore.controller.js

const User = require('../models/user.model');

// Only keep mock data for categories
const categories = [
  { image: '/images/creator.jpg', label: 'Explore', sublabel: 'Art' },
  { image: '/images/music.jpg', label: 'Explore', sublabel: 'Music' },
  { image: '/images/dancing.jpg', label: 'Explore', sublabel: 'Dance' },
  { image: '/images/podcast.jpg', label: 'Explore', sublabel: 'Podcast' },
  { image: '/images/content.webp', label: 'Explore', sublabel: 'Vlogs' },
];

exports.getFeaturedCreators = async (req, res) => {
  try {
    const creators = await User.find({ role: 'creator' })
  .sort({ createdAt: -1 })     // ✅ latest first
  .limit(5)                    // ✅ only 5 users
  .select('name username role profilePhoto createdAt');

    // Map to frontend format
    const result = creators.map(c => ({
      profilePhoto: c.profilePhoto || '',
      name: c.name || c.username,
      role: c.role,
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch creators' });
  }
};

exports.getNewCreators = async (req, res) => {
  try {
    const creators = await User.find({ role: 'creator' })
  .sort({ createdAt: -1 })     // ✅ latest first
  .limit(5)                    // ✅ only 5 users
  .select('name username role profilePhoto createdAt');

    // Map to frontend format
    const result = creators.map(c => ({
      profilePhoto: c.profilePhoto || '',
      name: c.name || c.username,
      role: c.role,
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch creators' });
  }
};

exports.getCategories = (req, res) => {
  res.json(categories);
}; 