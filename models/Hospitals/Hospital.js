
const mongoose=require('mongoose')

const Hospital=new mongoose.Schema({
    address:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    speciallized:[
        {
            type:String
        }
    ]
},{timestamps:true})