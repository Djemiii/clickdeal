const Coupon = require('../models/Coupon');
const SpinHistory = require('../models/SpinHistory');
const AppError = require('../utils/AppError');
const notificationService = require('./notification.service');

exports.spinWheel = async (user) => {
  // 1) Vérifier la limite quotidienne (3 fois par jour)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const howManyTimesToday = await SpinHistory.countDocuments({
    user: user._id,
    date: { $gte: today }
  });

  if (howManyTimesToday >= 3) {
    throw new AppError("Vous avez déjà joué 3 fois aujourd'hui", 429);
  }

  // 2) Définir les probabilités (simple à comprendre)
  const CHANCE_WIN = 30; // 30% de chance de gagner
  const randomNumber = Math.floor(Math.random() * 100) + 1; // 1 à 100
  
  console.log(`🎲 Nombre tiré: ${randomNumber} (Chance de gagner: ${CHANCE_WIN}%)`);

  let result;

  if (randomNumber <= CHANCE_WIN) {
    // Récupérer un coupon exclusif aléatoire
    const exclusiveCoupons = await Coupon.find({
      isApproved: true,
      isActive: true,
      isExclusif: true  
    });

    if (exclusiveCoupons.length === 0) {
      // Pas de coupons exclusifs 
      result = {
        isWinner: false,
        message: "Oups ! Aucun coupon exclusif disponible pour le moment",
        coupon: null
      };
    } else {
      // Choisir un coupon exclusif au hasard
      const randomIndex = Math.floor(Math.random() * exclusiveCoupons.length);
      const wonCoupon = exclusiveCoupons[randomIndex];

      result = {
        isWinner: true,
        message: `🎉 Félicitations ! Vous avez gagné un coupon exclusif !`,
        coupon: wonCoupon
      };

      await notificationService.sendNotification(
        user._id,
        'spin_won',
        `Bravo ! Coupon exclusif "${wonCoupon.title}" gagné à la roue !`
      );
    }
  } else {
    result = {
      isWinner: false,
      message: "Oups ! Rien cette fois-ci. Retentez votre chance !",
      coupon: null
    };
  }

  // 3) Sauvegarder l'historique (gagné ou perdu)
  user.lastSpinAt = new Date();
  await user.save();

  await SpinHistory.create({
    user: user._id,
    coupon: result.coupon ? result.coupon._id : null,
    isWinner: result.isWinner,
    date: new Date()
  });

  // 4) Calculer les jeux restants
  const jeuRestant = 3 - (howManyTimesToday + 1);

  return {
    ...result,
    jeuRestant: jeuRestant,
    totalSpinsToday: howManyTimesToday + 1
  };
};

// Fonction pour récupérer l'historique
exports.getUserSpinHistory = async (userId) => {
  return await SpinHistory.find({ user: userId })
    .sort({ date: -1 })
    .populate('coupon', 'title description discount isExclusif')
    .limit(10); // Limiter à 10 derniers résultats
};

