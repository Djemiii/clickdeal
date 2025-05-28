const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

exports.register = async (data) => {
  const userExists = await User.findOne({ email: data.email });
  if (userExists) throw new AppError('Utilisateur déjà existant', 400);

  const user = await User.create(data);

  // ❌ Ne génère pas le token ici
  return { user };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    throw new AppError('Identifiants invalides', 401);
  }

  const token = generateToken(user);
  return { user, token };
};
