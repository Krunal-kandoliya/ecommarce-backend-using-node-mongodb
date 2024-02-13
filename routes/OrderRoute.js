const express=require("express")
const router=express.Router()
const auth=require('../middlewares/Authmiddleware')
const isadmin=require('../middlewares/Adminauth')
const { createOrder,GetMyOrder, singleproduct,payments, Admingetallorder, Changeorderstatus } = require("../controllers/OrderController")

//create category
router.post('/createorder',auth,createOrder)

//get all order
router.get('/my-order',auth,GetMyOrder )

//single order info

router.get('/my-order/:id',auth,singleproduct)

//for payment
router.post('/payment',auth,payments)

//admin only

router.get('/admin/get-all-order',auth,isadmin,Admingetallorder)

//order status

router.put('/admin/order/:id',auth,isadmin,Changeorderstatus)

module.exports=router