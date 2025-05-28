// middlewares/checkCompanyProfileComplete.js

const AppError = require('../utils/AppError');

module.exports = (req, res, next) => {
  const user = req.user;

  if (user.role !== 'entreprise') {
    return next(); // Pas concerné, c’est un consommateur
  }

  const requiredFields = ['phone', 'website', 'secteurActivite', 'description', 'logo'];
  const missingFields = requiredFields.filter(field => !user[field]);

  if (missingFields.length > 0) {
    return next(new AppError(`Profil incomplet. Champs manquants : ${missingFields.join(', ')}`, 400));
  }

  next();
};
