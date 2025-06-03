const User = require('../models/User');
const AppError = require('../utils/AppError');

exports.getMyProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new AppError('Utilisateur introuvable', 404);
  return user;
};

exports.updateProfile = async (userId, updates) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError('Utilisateur introuvable', 404);

  Object.assign(user, updates);
  await user.save();
  return user;
};

exports.uploadLogo = async (userId, file) => {
  if (!file) throw new AppError('Aucun fichier uploadé', 400);

  const user = await User.findById(userId);
  if (!user) throw new AppError('Utilisateur introuvable', 404);

  user.logo = `/uploads/logos/${file.filename}`;
  await user.save();

  return user.logo;
};
