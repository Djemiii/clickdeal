const multer = require('multer');
const path = require('path');

// stockage local
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/logos/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (['.png', '.jpg', '.jpeg'].includes(ext)) cb(null, true);
  else cb(new Error('Format de fichier non autorisé'), false);
};
const upload = multer({ storage, fileFilter });

module.exports = upload;
