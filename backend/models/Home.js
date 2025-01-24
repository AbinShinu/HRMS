const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  location: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true }, // e.g., apartment, villa, etc.
  contactPersonName: { type: String, required: true },  // Changed field name to top-level
  contactPersonPhone: { type: String, required: true },  // Changed field name to top-level
  contactPersonEmail: { type: String, required: true },  // Changed field name to top-level
  status: { 
    type: String, 
    enum: ['available', 'rented'], 
    default: 'available', 
    required: true 
  }, // Home availability
  availability: { type: Boolean, default: true },
  imageUrl: { 
    type: Array, 
    required: true
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
