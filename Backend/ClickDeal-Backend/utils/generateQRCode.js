const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

module.exports = async function generateQRCode(code) {
  const filePath = `uploads/qrcodes/${code}.png`;

  await QRCode.toFile(filePath, code, {
    color: {
      dark: '#000',
      light: '#FFF'
    }
  });

  return filePath;
};
