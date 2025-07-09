const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    mediaUrl: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      enum: ['image', 'video'],
      required: true,
    },
    category: {
      type: String,
      enum: ['art', 'music', 'dance', 'podcast'],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // if user auth is optional
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
