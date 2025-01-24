const express = require('express')

const {getuser,login,adduser,deleteuser,godashboard,authenticate,getUserById,addHome,gethome,profilesettings,fetchdata} = require('../controller/userController.js')
const upload = require('../multer.js');



const userRouter = express.Router()

userRouter.get('/',getuser)
userRouter.post('/login',login)
userRouter.post('/signup',adduser)
userRouter.delete('/:id',deleteuser)
userRouter.post('/admindashboard',godashboard)
userRouter.put('/profilesettings/:id',authenticate,profilesettings)
userRouter.get('/:id',getUserById)
userRouter.post('/api/addhome', upload.single('image1'), addHome);
userRouter.get('/api/home', gethome)
userRouter.get('/fetch/:id',authenticate, fetchdata)

module.exports=userRouter
