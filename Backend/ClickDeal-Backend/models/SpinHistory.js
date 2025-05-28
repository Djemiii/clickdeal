const mongoose = require('mongoose');

const spinHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon', required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SpinHistory', spinHistorySchema);
