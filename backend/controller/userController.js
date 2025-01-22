const User = require("../models/User.js")
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Home = require('../models/Home.js');

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
  try{
      const homes = await Home.find({})
      res.status(200).json(homes) 
  }
  catch{
      res.status(500).json({error:error});
      }
    
}
const fetchdata = async (req,res) => {
  try {
    const userId = req.user.userId; // Extract userId from token
    const user = await User.findById(userId).select('-password'); // Exclude password field

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user); // Respond with the user data
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  }
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
      'your_secret_key',
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
      // Check if the user already exists based on email or username
      const existingUser = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email or username already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 salt rounds
  
      // Prepare the user object with a default role of 'tenant'
      const userItem = {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword, // Save hashed password
        role: req.body.role || 'tenant', // Default role is 'tenant'
      };
  
      // Create a new user instance
      const user = new User(userItem);
  
      // Save the user to the database
      await user.save();
  
      // Respond with the newly created user (excluding password for security)
      const { password, ...userData } = user.toObject(); // Exclude the password field from the response
      res.status(201).json(userData); // Return user details without the password
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: error.message });
    }
  };
  const profilesettings = async (req, res) => {
    try {
      const { name, username, email, password } = req.body;
  
      // Extract userId from the token (attached by the middleware)
      const userId = req.user.userId;
  
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update user details if provided
      if (name) user.name = name;
      if (username) user.username = username;
      if (email) {
        // Add validation for email format (optional)
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ message: "Invalid email format" });
        }
        user.email = email;
      }
  
      // If password is provided, hash it before saving
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
  
      // Save the updated user
      await user.save();
  
      // Respond with the updated user info (excluding password)
      res.status(200).json({
        message: "Profile updated successfully",
        user: {
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
          phone: user.phone,  // Including phone in response if available
        },
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  
  
const deleteuser = async (req,res) => {
    try{

    const deleteuser = await User.findByIdAndDelete(req.params.id)
    if(!deleteuser) return res.status(404).json({message:"user not found"})
        res.json({message:"Sucessfully deleted"})
}catch(error){
    res.status(500).json({error:error})

}
}
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
  const token = req.header('Authorization')?.split(' ')[1]; // Extract the token

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
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
      contactPerson: {
        name: req.body.contactPerson.name,
        phone: req.body.contactPerson.phone,
        email: req.body.contactPerson.email,
      },
      status: req.body.status || "available", // Default status is 'available'
      availability: req.body.availability !== undefined ? req.body.availability : true,
    };

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


 


module.exports={getuser,login,adduser,profilesettings,deleteuser,godashboard,authenticate,getUserById,addHome,gethome,fetchdata}