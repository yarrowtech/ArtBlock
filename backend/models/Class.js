const mongoose = require('mongoose');

const classSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: String,
    time: String,
    link: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Class', classSchema);
