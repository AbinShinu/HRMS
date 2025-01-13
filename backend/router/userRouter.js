const express = require('express')

const {getuser,login, adduser, updateuser,deleteuser,godashboard} = require('../controller/userController.js')


const userRouter = express.Router()
userRouter.get('/',getuser)
userRouter.post('/login',login)
userRouter.post('/signup',adduser)
//userRouter.patch('/:id',updateuser)
userRouter.delete('/:id',deleteuser)
userRouter.post('/admindashboard',godashboard)
userRouter.post('/update',updateuser)


module.exports=userRouter
