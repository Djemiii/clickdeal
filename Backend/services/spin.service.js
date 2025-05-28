// services/spin.service.js

const Coupon = require('../models/Coupon');
const SpinHistory = require('../models/SpinHistory');
const AppError = require('../utils/AppError');
const notificationService = require('./notification.service');

exports.spinWheel = async (user) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (user.lastSpinAt && user.lastSpinAt >= today) {
    throw new AppError("Vous avez déjà tourné la roue aujourd'hui", 429);
  }

  // Sélection d’un coupon approuvé et actif, au hasard
  const [coupon] = await Coupon.aggregate([
    { $match: { isApproved: true, isActive: true } },
    { $sample: { size: 1 } }
  ]);

  if (!coupon) {
    throw new AppError("Aucun coupon disponible actuellement", 404);
  }

  // Mise à jour de la date de dernier spin
  user.lastSpinAt = new Date();
  await user.save();

  // Enregistrement de l’historique
  await SpinHistory.create({
    user: user._id,
    coupon: coupon._id
  });

  // Notification
  await notificationService.sendNotification(
    user._id,
    'spin_won',
    `Félicitations ! Vous avez gagné le coupon "${coupon.title}"`
  );

  return {
    message: "Bravo, vous avez gagné !",
    coupon
  };
};

exports.getUserSpinHistory = async (userId) => {
  return await SpinHistory.find({ user: userId })
    .sort({ date: -1 })
    .populate('coupon', 'title description discount');
};
