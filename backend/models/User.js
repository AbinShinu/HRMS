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

const User = mongoose.model('User', userSchema);

module.exports = User;
