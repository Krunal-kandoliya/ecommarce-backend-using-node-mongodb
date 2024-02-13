const mongoose=require("mongoose")

const reviewSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    rating:{
        type:Number,
        default:0
    },
    comment:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"user is required"]
    }
},{timestamps:true})

const review=mongoose.model("Review",reviewSchema)

module.exports=review