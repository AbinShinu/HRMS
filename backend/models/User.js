const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, enum: ['admin', 'tenant'], required: true },
    phone: { type: String, trim: true, required: true }, // Added phone field
  },
  { timestamps: true }
);

const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = authenticate;

const User = mongoose.model('User', userSchema);

module.exports = User;
