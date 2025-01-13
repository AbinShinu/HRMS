const express = require('express')

const {addhome} = require('..controller/HomeController.js')

const AdmimRouter = express.Router()

AdmimRouter.post('/addhome',addhome)

module.exports=AdmimRouter
