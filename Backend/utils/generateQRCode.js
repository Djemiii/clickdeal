const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

module.exports = async function generateQRCode(code) {
  const dir = path.join(__dirname, '..', 'uploads', 'qrcodes');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const absolutePath = path.join(dir, `${code}.png`);

  const relativePath = `/uploads/qrcodes/${code}.png`;

  await QRCode.toFile(absolutePath, code, {
    color: {
      dark: '#000',
      light: '#FFF'
    }
  });

  return relativePath;
};
