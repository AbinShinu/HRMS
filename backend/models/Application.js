const mongoose = require('mongoose');

// Define the Application schema
const applicationSchema = new mongoose.Schema({
  applicationId: { type: String, required: true, unique: true },
  applicantName: { type: String, required: true },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Assuming 'User' is the applicant model
  timestamp: { type: Date, default: Date.now },
  homeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Home', required: true },  // Assuming 'Home' is the home model
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
});

// Create the Application model
const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
