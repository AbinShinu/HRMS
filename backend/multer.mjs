// In CommonJS, use dynamic import for ESM modules
const multer = await import('multer');

const storage = multer.default.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer.default({ storage });

module.exports = upload;
