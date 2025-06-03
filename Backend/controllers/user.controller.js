const userService = require('../services/user.service');

exports.getMyProfile = async (req, res, next) => {
  try {
    const user = await userService.getMyProfile(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const updated = await userService.updateProfile(req.user.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

exports.uploadLogo = async (req, res, next) => {
  try {
    const logoPath = await userService.uploadLogo(req.user.id, req.file);
    res.status(200).json({ logo: logoPath });
    console.log('file',req.file);
    
  } catch (err) {
    next(err);
  }
};
