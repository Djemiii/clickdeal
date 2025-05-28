const spinService = require('../services/spin.service');

exports.spinWheel = async (req, res, next) => {
  try {
    const result = await spinService.spinWheel(req.user);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getSpinHistory = async (req, res, next) => {
  try {
    const history = await spinService.getUserSpinHistory(req.user._id);
    res.status(200).json(history);
  } catch (err) {
    next(err);
  }
};
