const express=require('express')
const router=express.Router()
const Testcontroller = require('../controllers/Testcontroller')




router.get('/test',Testcontroller)

module.exports=router