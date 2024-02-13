const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true,

    },
    name:{
        type:String,
        required:true
    },
    productimg:{
        type:String,

    },
    price:{
        type:Number,
        default:0
    },
    stock:{
        type:Number,
        default:0
    },
    catogery:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Catogerty',
        required:true
    },
    ownership:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})


export const product=mongoose.model("Product",productSchema)