const jwt=require('jsonwebtoken')
const usermodel=require('../models/User.modal')

const authencate=async(req,res,next)=>{
    const {token}=req.cookies
    //validate
    if(!token){
        return res.status(401).send({
            success:false,
            message:"UNAUTHORIZED USER"
        })
    }
const decode=jwt.verify(token,process.env.JWT_SECRET,{
    expiresIn:"7d"
})
req.user=await usermodel.findById(decode._id)
next()
}

module.exports=authencate