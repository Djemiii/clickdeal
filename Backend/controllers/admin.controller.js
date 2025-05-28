const Coupon = require('../models/Coupon');
const User = require('../models/User');
const notificationService = require('../services/notification.service');
const AppError = require('../utils/AppError');

// Tous les coupons en attente

exports.getPendingCoupons = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const total = await Coupon.countDocuments({ isApproved: false });
    const coupons = await Coupon.find({ isApproved: false })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('company', 'name email');

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      coupons
    });
  } catch (err) {
    next(err);
  }
};


// Approuver un coupon
exports.approveCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!coupon) return next(new AppError("Coupon introuvable", 404));

    // NOTIFICATION
    await notificationService.sendNotification(
      coupon.company,
      'coupon_approved',
      `Votre coupon "${coupon.title}" a été approuvé`
    );

    res.status(200).json({ message: "Coupon approuvé", coupon });
  } catch (err) {
    next(err);
  }
};


// Supprimer un coupon
exports.deleteCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) return next(new AppError("Coupon introuvable", 404));

    res.status(200).json({ message: "Coupon supprimé" });
  } catch (err) {
    next(err);
  }
};

// Voir tous les utilisateurs
exports.getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const total = await User.countDocuments();
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-password');

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      users
    });
  } catch (err) {
    next(err);
  }
};