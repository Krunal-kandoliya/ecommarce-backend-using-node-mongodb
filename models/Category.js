const mongoose=require("mongoose")
const CategorySchema=new mongoose.Schema({
    category:{
        type:String,
        required:[true,"category Name is Required"]
    },

},{timestamps:true})

const cats=mongoose.model("Catogory",CategorySchema)


module.exports=cats;