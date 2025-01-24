const express = require('express');
const userRouter = require('./router/userRouter.js');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;


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
