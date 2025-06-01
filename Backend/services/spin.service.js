// services/spin.service.js

const Coupon = require('../models/Coupon');
const SpinHistory = require('../models/SpinHistory');
const AppError = require('../utils/AppError');
const notificationService = require('./notification.service');

exports.spinWheel = async (user) => {
  // 1) Définir "aujourd'hui" (de 00h00 à 23h59)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 2) Compter combien de fois l'utilisateur a joué aujourd'hui
  const howManyTimesToday = await SpinHistory.countDocuments({
    user: user._id,
    date: { $gte: today }  // Depuis aujourd'hui 00h00
  });

  if (howManyTimesToday >= 3) {
    throw new AppError("Vous avez déjà joué 3 fois aujourd'hui", 429);
  }

  const [coupon] = await Coupon.aggregate([
    { $match: { isApproved: true, isActive: true } },
    { $sample: { size: 1 } }
  ]);

  if (!coupon) {
    throw new AppError("Aucun coupon disponible actuellement", 404);
  }

  user.lastSpinAt = new Date();
  await user.save();

  await SpinHistory.create({
    user: user._id,
    coupon: coupon._id
  });

  await notificationService.sendNotification(
    user._id,
    'spin_won',
    `Félicitations ! Vous avez gagné le coupon "${coupon.title}"`
  );

  const jeuRestant = 3 - (howManyTimesToday + 1);

  return {
    message: "Bravo, vous avez gagné !",
    coupon,
    jeuRestant: jeuRestant
  };
};

exports.getUserSpinHistory = async (userId) => {
  return await SpinHistory.find({ user: userId })
    .sort({ date: -1 })
    .populate('coupon', 'title description discount');
};