const multer = require('multer');

const storage = multer.diskStorage({
  // Define the folder where files will be stored
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists or create it dynamically
  },
  // Define how file names are saved
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix); // Add a timestamp to prevent overwriting files with the same name
  },
});

const upload = multer({ storage });

module.exports = upload;
