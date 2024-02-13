const mongoose=require('mongoose')

const patient=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    diagonistiswith:{
        type:String,
        required:true
    },
    adress:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gendar:{
        type:String,
        enum:['m','f','o'],
        required:true
    },
    addmitedat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hospital"
    }

},{timestamps:true})