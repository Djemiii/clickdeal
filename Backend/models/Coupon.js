const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  code: { type: String, unique: true },
  discount: { type: Number, required: true },
  category: { type: String },
  location: { type: String },
  startDate: Date,
  endDate: Date,
  conditions: String,
  isActive: { type: Boolean, default: true },
  views: { type: Number, default: 0 },
  downloads: { type: Number, default: 0 },
  conversions: { type: Number, default: 0 },
  isApproved: { type: Boolean, default: false },
  isExclusif: { type: Boolean, default: false },
  qrCode: String, // base64 image
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Coupon', couponSchema);
