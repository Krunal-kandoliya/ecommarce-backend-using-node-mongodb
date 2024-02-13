
const mongoose=require('mongoose')



const doctorscema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    experienceinyears:{
        type:Number,
        default:0
    },
    worksinhospitals:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Hospital'
    }]


},{timestamps:true})