const express = require('express')

const {getuser,login,adduser,deleteuser,godashboard,authenticate,getUserById,addHome,gethome,profilesettings,fetchdata} = require('../controller/userController.js')
const { default: upload } = require('../multer.mjs')


const userRouter = express.Router()

userRouter.get('/',getuser)
userRouter.post('/login',login)
userRouter.post('/signup',adduser)
userRouter.delete('/:id',deleteuser)
userRouter.post('/admindashboard',godashboard)
userRouter.put('/profilesettings/:id',authenticate,profilesettings)
userRouter.get('/:id',getUserById)
userRouter.post('/addhome',upload.fields([{name:'image1',maxCount:1}]), addHome)
userRouter.get('/api/home', gethome)
userRouter.get('/fetch/:id',authenticate, fetchdata)

module.exports=userRouter
