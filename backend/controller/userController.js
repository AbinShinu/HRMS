const User = require("../models/User.js")
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Home = require('../models/Home.js');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const Application = require('../models/Application.js');
const crypto = require('crypto');

const generateUniqueId = () => crypto.randomUUID(); // Available in Node.js v14.17.0+


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

  const counthome = async (req, res) => {
    try {
      const totalHomes = await Home.countDocuments();
      const availableHomes = await Home.countDocuments({ status: 'available' });
      const rentedHomes = await Home.countDocuments({ status: 'rented' });

      res.status(200).json({
          totalHomes,
          availableHomes,
          rentedHomes,
      });
  } catch (error) {
      console.error('Error fetching home counts:', error);
      res.status(500).json({ error: 'Failed to fetch home counts' });
  }
  };
  
  const addApplication = async (req, res) => {
    const { applicantName, applicantId, homeId } = req.body;
    try {
        // Fetch the home by its ID to check its status
        const home = await Home.findById(homeId);
        
        // If home is not found, return an error
        if (!home) {
            return res.status(404).json({ message: 'Home not found' });
        }
        
        // Check if the home is rented
        if (home.status === 'rented') {
            return res.status(400).json({ message: 'This home is already rented. You cannot apply.' });
        }

        // Create new application
        const newApplication = new Application({
            applicationId: generateUniqueId(), // Generate or assign a unique ID
            applicantName,
            applicantId,
            homeId,
            status: 'pending',
        });

        // Save the application to the database
        await newApplication.save();
        res.status(200).json({ message: 'Application submitted successfully', application: newApplication });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving application', error: error.message });
    }
};


  const countapplication = async (req, res) => {
    try {
      const totalApplications = await Application.countDocuments();
      const pendingApplications = await Application.countDocuments({ status: 'pending' });

      res.status(200).json({
          totalApplications,
          pendingApplications,
      });
  } catch (error) {
      console.error('Error fetching application counts:', error);
      res.status(500).json({ error: 'Failed to fetch application counts' });
  }
  };

  const getApplications = async (req, res) => {
    try {
      const applications = await Application.find().populate('applicantId').populate('homeId');
      res.status(200).json(applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
      res.status(500).json({ error: 'Failed to fetch applications' });
    }
  };

  const approveApplication = async (req, res) => {  
    const { id } = req.params;
    try {
        // Find the application by ID
        const application = await Application.findById(id).populate('homeId'); // Assuming homeId is populated from the Application model
        
        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }

        // Update application status to 'approved'
        application.status = 'approved';
        const updatedApplication = await application.save();

        // Update the corresponding home's status to 'rented'
        const updatedHome = await Home.findByIdAndUpdate(
            application.homeId._id, // Reference to the home via application
            { status: 'rented' },
            { new: true }
        );

        if (!updatedHome) {
            return res.status(500).json({ error: "Failed to update home status" });
        }

        // Send a response with the updated application and home status
        res.status(200).json({
            message: "Application approved, and home status updated to rented",
            application: updatedApplication,
            home: updatedHome,
        });
    } catch (error) {
        console.error("Error approving application:", error);
        res.status(500).json({ error: "Failed to approve application" });
    }
};


  const deleteApplication = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Update the application's status to 'rejected'
      const updatedApplication = await Application.findByIdAndUpdate(
        id,
        { status: "rejected" }, // Set status to 'rejected'
        { new: true } // Return the updated document
      );
  
      if (!updatedApplication) {
        return res.status(404).json({ error: "Application not found" });
      }
  
      res.status(200).json({ message: "Application status updated to rejected", application: updatedApplication });
    } catch (error) {
      console.error("Error updating application status:", error);
      res.status(500).json({ error: "Failed to update application status" });
    }
  };
  

  const getUserApplications = async (req, res) => {
    try {
      const applicantId = req.params.applicantId;
      const applications = await Application.find({ applicantId }).populate('homeId', 'location price');
      res.status(200).json(applications);
  } catch (error) {
      console.error('Error fetching applications:', error);
      res.status(500).json({ error: 'Failed to fetch applications' });
  }
  };

  const editHome = async (req, res) => {
    const { homeId } = req.params;
    

    try {
        const home = await Home.findById(homeId);
        if (!home) {
            return res.status(404).json({ message: 'Home not found' });
        }

        

        // Update home details
        if (req.body.location) home.location = req.body.location;
        if (req.body.price) home.price = req.body.price;
        if (req.body.category) home.category = req.body.category;
        if (req.body.imageUrl) home.imageUrl = req.body.imageUrl;
        if (req.body.contactPersonName) home.contactPersonName = req.body.contactPersonName;
        if (req.body.contactPersonPhone) home.contactPersonPhone = req.body.contactPersonPhone;
        if (req.body.contactPersonEmail) home.contactPersonEmail = req.body.contactPersonEmail;
        if (req.body.status) home.status = req.body.status;

        // Save the updated home
        await home.save();
        

        // Respond with the updated home
        res.status(200).json({ message: 'Home updated successfully', home });
    } catch (error) {
        console.error('Error updating home:', error);
        res.status(500).json({ message: 'Failed to update home' });
    }
};

module.exports={getuser,login,adduser,profilesettings,deleteuser,authenticate,getUserById,addHome,gethome,fetchdata,deletehome,counthome,addApplication,countapplication,getApplications,approveApplication,deleteApplication,getUserApplications,editHome}
