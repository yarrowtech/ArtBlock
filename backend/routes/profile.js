const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/user.model');

const router = express.Router();

// Ensure folders exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/others/';
    if (file.fieldname === 'profilePhoto') {
      uploadPath = 'uploads/profilePhotos/';
    } else if (file.fieldname === 'coverPhoto') {
      uploadPath = 'uploads/coverPhotos/';
    }
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

// @route POST /api/profile/update
router.post(
  '/update',
  upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'coverPhoto', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { username, name, email, bio, role } = req.body;

      const profilePhoto = req.files.profilePhoto?.[0]?.path;
      const coverPhoto = req.files.coverPhoto?.[0]?.path;

      const user = await User.findOne({ username });
      if (!user) return res.status(404).json({ message: 'User not found' });

      user.name = name;
      user.email = email;
      user.bio = bio;
      if (profilePhoto) user.profilePhoto = profilePhoto;
      if (coverPhoto) user.coverPhoto = coverPhoto;

      await user.save();
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (err) {
      console.error('Error updating profile:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
