const mongoose=require("mongoose")

const orderitemsschema= new mongoose.Schema({
    productid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    quantity:{
        type:Number,
        required:true
    }
})


const orderschema=new mongoose.Schema({
    orderprice:{
        type:Number,
        required:true
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    orderitems:{
        type:[orderitemsschema]
    },
    address:{
        type:String,
        required:true
    },

    status:{
        type:String,
        enum:["pending","cancelled","delivered"],
        default:"pending"
    }

},{timestamps:true})



export const order=mongoose.model("order",orderschema)