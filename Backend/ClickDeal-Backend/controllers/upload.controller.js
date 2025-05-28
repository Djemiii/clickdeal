
exports.uploadLogo = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Aucun fichier envoyé' });
  const url = `/uploads/logos/${req.file.filename}`;
  res.json({ logoUrl: url });
};
