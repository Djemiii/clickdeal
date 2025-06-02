// controllers/spin.controller.js
const spinService = require('../services/spin.service');

// Faire tourner la roue
exports.spinWheel = async (req, res, next) => {
  try {
    const result = await spinService.spinWheel(req.user);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err); 
  }
};

// Récupérer l'historique de l'utilisateur
exports.getMySpinHistory = async (req, res, next) => {
  try {
    const history = await spinService.getUserSpinHistory(req.user._id);
    res.status(200).json({
      success: true,
      data: history
    });
  } catch (err) {
    next(err);
  }
};

// Récup info sur les spins
exports.getSpinInfo = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const SpinHistory = require('../models/SpinHistory');
    const spinsToday = await SpinHistory.countDocuments({
      user: req.user._id,
      date: { $gte: today }
    });

    const jeuRestant = Math.max(0, 3 - spinsToday);

    res.status(200).json({
      success: true,
      data: {
        spinsToday,
        jeuRestant,
        maxSpinsPerDay: 3,
        canSpin: jeuRestant > 0
      }
    });
  } catch (err) {
    next(err);
  }
};
