const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/user.model');
const auth = require('../middlewares/auth.middleware').auth;

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
  auth,
  upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'coverPhoto', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { name, email, bio } = req.body;
      const profilePhoto = req.files.profilePhoto?.[0]?.path;
      const coverPhoto = req.files.coverPhoto?.[0]?.path;

      const user = await User.findById(req.user._id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      if (name) user.name = name;
      if (email) user.email = email;
      if (bio) user.bio = bio;
      if (profilePhoto) user.profilePhoto = profilePhoto;
      if (coverPhoto) user.coverPhoto = coverPhoto;

      await user.save();
      const userObj = user.toObject();
      delete userObj.password;
      res.status(200).json({ message: 'Profile updated successfully', user: userObj });
    } catch (err) {
      console.error('Error updating profile:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
