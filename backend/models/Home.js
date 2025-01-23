const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  location: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., apartment, villa, etc.
  contactPerson: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  status: { 
    type: String, 
    enum: ['available', 'rented'], 
    default: 'available', 
    required: true 
  }, // Home availability
  availability: { type: Boolean, default: true },
  imageUrl: { 
    type: String, 
    required: false, 
    default: null 
  }, // Image URL or path
  applicants: [
    {
      tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      appliedAt: { type: Date, default: Date.now },
    },
  ], // Track tenants who applied
});

const Home = mongoose.model('Home', homeSchema);

module.exports = Home;
