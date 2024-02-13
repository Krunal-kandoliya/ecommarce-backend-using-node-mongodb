const mongoose=require('mongoose')

const catogerySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
},{timestamps:true})

export const catogery=mongoose.model("Catogerty",catogerySchema)