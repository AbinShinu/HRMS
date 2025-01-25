const User = require("../models/User.js")
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Home = require('../models/Home.js');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const getuser = async (req,res) => {

  try{
      const users = await User.find({})
      res.status(200).json(users) 
  }
  catch{
      res.status(500).json({error:error});
      }
  
  
}
const gethome = async (req,res) => {
  try {
    const homes = await Home.find().populate('applicants.tenantId', 'name email'); // Populating tenant details
    res.status(200).json(homes);
  } catch (error) {
    console.error('Error fetching homes:', error);
    res.status(500).json({ error: 'Failed to fetch homes' });
  } 
}
const fetchdata = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getUserById = async (req, res) => {
  const userId = req.params.id;  // This should be a valid ObjectId
  
  // Ensure that the userId is a valid ObjectId before querying
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid user ID format' });
  }
  
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role }, // Include role in the token payload
      'gfgfg454$h76@',
      { expiresIn: '1h' }
    );

    // Respond with user details, role, and token
    return res.status(200).json({
      message: "Login Successful",
      token: token,
      userId: user._id, // Send the userId
      user: {
        email: user.email,
        role: user.role, // Include role in the response
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};





const adduser = async (req, res) => {
  try {
    // Check if the user already exists based on email or phone
    const existingUser = await User.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or phone number already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Prepare the user object
    const userItem = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword, // Save hashed password
      role: req.body.role || 'tenant',
      phone: req.body.phone, // Save phone number
    };

    // Create and save the new user
    const user = new User(userItem);
    await user.save();

    const { password, ...userData } = user.toObject(); // Exclude password
    res.status(201).json(userData);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: error.message });
  }
};

const profilesettings = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }
    const { name, email, phone } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details if provided
    if (name) user.name = name;
    if (email) {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
      user.email = email;
    }

    // Update phone number if provided
    if (phone) user.phone = phone;

    // Save the updated user
    await user.save();

    // Respond with the updated user info (excluding password and username)
    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,  // Include phone in response
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


  
  
  
const deleteuser = async (req, res) => {
  try {
    const userId = req.params.userId;
    //console.log("Received userId:", userId); // Log userId for debugging

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const godashboard = async (req, res) => {
    try {
      // Dummy data for testing
      const totalRequests = 10; // Replace with actual database query later
      const newRequests = 3; // Replace with actual database query later
  
      // Respond with dummy data
      res.status(200).json({
        totalRequests,
        newRequests,
      });
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: error.message });
    }
  };

  const jwt = require('jsonwebtoken');

  const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(400).json({ message: 'Token is missing or invalid' });
    }
  
    const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"
    
    try {
      const decoded = jwt.verify(token, 'gfgfg454$h76@'); // Use your JWT secret
      req.user = decoded; // Attach decoded data (e.g., userId) to the request
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  };
  
  
  

  const addHome = async (req, res) => {
    try {
      // Check if a home with the same location and category already exists
      const existingHome = await Home.findOne({
        location: req.body.location,
        category: req.body.category,
        price: req.body.price,
      });
  
      if (existingHome) {
        return res.status(400).json({ error: "A home with the same details already exists" });
      }
  
  
      // Prepare the home object
      const homeItem = {
        location: req.body.location,
        price: req.body.price,
        category: req.body.category,
        imageUrl: req.body.homeImageUrl,
        contactPersonName: req.body.contactPersonName,
        contactPersonPhone: req.body.contactPersonPhone,
        contactPersonEmail: req.body.contactPersonEmail,
        status: req.body.status || "available", // Default status is 'available'
        availability: req.body.availability !== undefined ? req.body.availability : true,
      };
      //console.log("Request Body:", req.body);
  
      // Create a new home instance
      const home = new Home(homeItem);
  
      // Save the home to the database
      await home.save();
  
      // Respond with the newly created home
      res.status(201).json({ message: "Home added successfully", home });
    } catch (error) {
      console.error("Error adding home:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
  const deletehome = async (req, res) => {
    try {
      const { homeId } = req.params;
  
      // Ensure the homeId is valid
      if (!mongoose.Types.ObjectId.isValid(homeId)) {
        return res.status(400).json({ error: 'Invalid home ID format' });
      }
  
      // Find and delete the home
      const home = await Home.findByIdAndDelete(homeId);
  
      if (!home) {
        return res.status(404).json({ message: 'Home not found' });
      }
  
      // Return success message
      res.status(200).json({ message: 'Home deleted successfully' });
    } catch (error) {
      console.error('Error deleting home:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  
module.exports={getuser,login,adduser,profilesettings,deleteuser,godashboard,authenticate,getUserById,addHome,gethome,fetchdata,deletehome}