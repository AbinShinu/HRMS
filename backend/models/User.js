const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // Required and trimmed
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, // Validate email format
    password: { type: String, required: true, minlength: 8 }, // Enforce strong passwords
    role: { type: String, enum: ['admin', 'tenant'], required: true }, // Role-based access
    phone: { type: String, trim: true }, // Optional field
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
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
