const express = require('express')

const {getuser,login, adduser,deleteuser,godashboard,authenticate,getUserById,addHome,gethome,profilesettings,fetchdata} = require('../controller/userController.js')


const userRouter = express.Router()

userRouter.get('/',getuser)
userRouter.post('/login',login)
userRouter.post('/signup',adduser)
userRouter.delete('/:id',deleteuser)
userRouter.post('/admindashboard',godashboard)
userRouter.post('/profilesettings',authenticate,profilesettings)
userRouter.get('/:id',getUserById)
userRouter.post('/addhome', addHome)
userRouter.post('/', gethome)
userRouter.get('/fetch', fetchdata)
module.exports=userRouter
