const  stripe   = require("../index");
const orders = require("../models/OrderModel");
// const product = require("../models/producModel");
const produ=require('../models/producModel')


const createOrder = async (req, res) => {
  try {
    const {
      shippinginfo,
      orderItems,
      paymentinfo,
      paymentMethod,
      tax,
      ShippingCharge,
      totalAmount,
      itemPrice,
    } = req.body;

   

    await orders.create({
      user: req.user._id,
      shippinginfo,
      orderItems,
      paymentMethod,
      paymentinfo,
      itemPrice,
      tax,
      ShippingCharge,
      totalAmount,
    });

    

    orderItems.map(async (e, i) => {
      const product = await produ.findById(e.product);
      product.stock -= e.quantity;
      await product.save();
    });

    res.status(201).send({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Order API",
      error,
    });
  }
};

//get all order -my order

const GetMyOrder=async(req,res)=>{
try {
  const ordr=await orders.find({user:req.user._id})
  if(!ordr){
    return res.status(404).send({
      success:true,
      message:"no Order Found"
    })
  }
  res.status(200).send({
    success:true,
    message:"Fetched Succesfull",
    totalOrder:ordr.length,
    ordr

  })
} catch (error) {
  console.log(error)
  res.status(500).send({
    success: false,
    message: "Error in Order API",
    error,
  });
}
}


const singleproduct=async(req,res)=>{
  try {
    const{id}=req.params
    const singleproduct=await orders.findById(id)
    if(!singleproduct){
      return res.status(404).send({
        success:false,
        message:"Single product not available"
      })
    }
    res.status(200).send({
      success:true,
      message:"your Order Fetched Succesfull",
      singleproduct
    })
  } catch (error) {
    console.log(error)
    if(error.name === "CastError"){
      return res.status(500).send({
        success:false,
        message:"Invalid ID"
      })
    }
    res.status(500).send({
      success:false,
      message:"SomethinG went Wrong"
    })
  }
}

//accept payments
const payments = async (req, res) => {
  try {
    const { totalAmount } = req.body;
    if (!totalAmount) {
      return res.status(404).send({
        success: false,
        message: "Total Amount is Required",
      });
    }

    const {client_secret} = await stripe.stripe.paymentIntents.create({
      amount: Number(totalAmount*100),
      currency: "inr",
      payment_method_types: ['card'],
    });

    res.status(200).send({
      success: true,
      client_secret,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Payment Something error",
    });
  }
};

//admin section

//get all orders

const Admingetallorder=async(req,res)=>{
try {
  const getallorder=await orders.find({})
  res.status(200).send({
    success:true,
    message:"All Order Data",
    totalorder:getallorder.length,
    getallorder

  })
} catch (error) {
  console.log(error)
  res.status(404).send({
    success:false,
    message:"Fetched Unsuccesfull"
  })
}
}

//change order status

const Changeorderstatus = async (req, res) => {
  try {
    const { id } = req.params;
    const orderstatus = await orders.findById(id); // Change 'orders' to 'OrderModel'

    if (!orderstatus) {
      return res.status(404).send({
        success: false,
        message: "Order Not Found",
      });
    }

    if (orderstatus.orderStatus === "processing") {
      orderstatus.orderStatus = "shipped";
    } else if (orderstatus.orderStatus === "shipped") {
      orderstatus.orderStatus = "delivered";
      orderstatus.delivedAt =  Date.now(); 
    } else {
      return res.status(500).send({
        success: false,
        message: "Order Already Delivered",
      });
    }

    await orderstatus.save();

    res.status(200).send({
      success: true,
      message: "Order Status Updated",
    });
  } catch (error) {
    console.log(error);
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid ID",
      });
    }
    res.status(500).send({
      success: false,
      message: "Something went Wrong",
    });
  }
};



module.exports = { createOrder,GetMyOrder,singleproduct ,payments,Admingetallorder,Changeorderstatus};
