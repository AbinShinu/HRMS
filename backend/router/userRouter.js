const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cloudinary = require('../cloudinary.js');  


const {getuser,login,adduser,deleteuser,authenticate,getUserById,addHome,gethome,profilesettings,fetchdata,deletehome,counthome,addApplication,countapplication,getApplications,approveApplication,deleteApplication} = require('../controller/userController.js')
const upload = multer({ dest: "uploads/" }); // Temporary storage for files


const userRouter = express.Router()

userRouter.get('/',getuser)
userRouter.post('/login',login)
userRouter.post('/signup',adduser)
userRouter.delete('/:userId', authenticate, deleteuser);
userRouter.delete('/api/home/:homeId',authenticate, deletehome);
userRouter.put('/profilesettings/:id',authenticate,profilesettings)
userRouter.get('/:id',getUserById)
userRouter.post('/api/addhome', upload.single('image1'), addHome);
userRouter.get('/api/home', gethome)
userRouter.get('/fetch/:id',authenticate, fetchdata)
userRouter.post("/api/upload", upload.single("image1"), async (req, res) => {
    try {
      // Check if the file exists
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
  
      const imageUrl = result.secure_url;
      console.log("Uploaded Image URL:", imageUrl);
  
      // Delete the local file
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting local file:", err);
      });
  
      res.status(200).json({ success: true, imageUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: "Image upload failed" });
    }
  });
userRouter.get('/api/home/count', counthome);
userRouter.post('/api/application/:id',authenticate, addApplication);
userRouter.get('/api/application/count', countapplication);
userRouter.get('/api/application', getApplications);
userRouter.patch('/api/application/:id/approve',  approveApplication);
userRouter.delete('/api/application/:id', deleteApplication);

module.exports=userRouter
