const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
  {
    name: String,
    price: String,
    features: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Plan', planSchema);
