const express = require('express');
const userRouter = require('./router/userRouter.js');
const mongoose = require('mongoose');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

const app = express();
const port = process.env.PORT || 3000;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: 'dw72cnkab',
  api_key: '642976867455911',
  api_secret: 'kGBHOlKAIhLyiqMG-8ktWShnAlU',
  secure: true
});

// Test Cloudinary URL
const url = cloudinary.url('try1', { transformation: [{ fetch_format: 'auto' }] });
//console.log('Cloudinary Test URL:', url);

// Middleware setup
app.use(express.json());
app.use(cors());

// MongoDB Connection
async function main() {
  try {
    await mongoose.connect('mongodb+srv://ams272826:v5Q9AfNlCgqmb8Y4@maincluster.d1jks.mongodb.net/hrms')
    console.log('DB Connected');
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (err) {
    console.error('Error connecting to DB:', err);
  }
}

// Routes
app.get('/', (req, res) => {
  res.send('From the server');
});

// Use User Router
app.use('/users', userRouter);

// Initiate DB connection
main().catch((err) => {
  console.error('Failed to connect to DB:', err);
});
