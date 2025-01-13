const User = require("../models/User.js")
const bcrypt = require('bcrypt');

const getuser = async (req,res) => {

    try{
        const users = await User.find({})
        res.status(200).json(users) 
    }
    catch{
        res.status(500).json({error:error});
        }
    
    
}
const getUserById = async (req, res) => {
  try {
    const { id } = req.params; // Extract the user ID from the request parameters

    // Find user by ID
    const user = await User.findById(id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the user data
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
  const updateuser = async (req, res) => {
    try {
      const { userId, name, username, email, password } = req.body;
  
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update user details if provided
      if (name) user.name = name;
      if (username) user.username = username;
      if (email) user.email = email;
  
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


 


module.exports={getuser,login,adduser,updateuser,deleteuser,godashboard,authenticate,getUserById}