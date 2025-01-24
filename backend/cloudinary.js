const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dw72cnkab',
    api_key: '642976867455911',
    api_secret: 'kGBHOlKAIhLyiqMG-8ktWShnAlU',
    secure: true
  });
  module.exports = cloudinary;