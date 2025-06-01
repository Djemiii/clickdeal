const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

module.exports = async function generateQRCode(code) {
  // Assure-toi que le dossier existe
  const dir = path.join(__dirname, '..', 'uploads', 'qrcodes');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Chemin absolu pour enregistrer le fichier
  const absolutePath = path.join(dir, `${code}.png`);

  // Chemin relatif à stocker en base ou renvoyer au client
  const relativePath = `/uploads/qrcodes/${code}.png`;

  await QRCode.toFile(absolutePath, code, {
    color: {
      dark: '#000',
      light: '#FFF'
    }
  });

  return relativePath;
};
