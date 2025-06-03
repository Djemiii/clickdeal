
const userService = require('../services/user.service');

exports.uploadLogo = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Aucun fichier envoyé' });

    const logoPath = await userService.uploadLogo(req.user.id, req.file); // ici on enregistre dans la BDD
    res.status(200).json({ logoUrl: `/${logoPath}` }); // on renvoie l’URL utilisable par le frontend
  } catch (error) {
    next(error);
  }
};
