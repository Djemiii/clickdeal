const AppError = require('../utils/AppError');

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Erreur interne du serveur';

  // Erreurs mongoose (format ID invalide, etc.)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Ressource non trouvée : ${err.path}`;
  }

  if (err.code === 11000) {
    statusCode = 400;
    message = 'Doublon de données';
  }

  res.status(statusCode).json({ message });
};

module.exports = errorHandler;
