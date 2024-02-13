const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:[true,'email already taken']
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minLength:[6,'password lenth is above to 6']
    },
    address:{
        type:String,
        required:[true,'Address is required']
    },
    city:{
        type:String,
        required:[true,'city name is required']
    },
    country:{
        type:String,
        required:[true,'country name is required']
    },
    phone:{
        type:String,
        required:[true,'phone no is required']
    },
    profilepic:{
        public_id:{
            type:String
        },
        url:{
            type:String
        }
    },
    role:{
        type:String,
        default:"user"
    },
    answer:{
        type:String,
        required:[true,'answer is Required']
    }
},{timestamps:true});

//hashing password

userSchema.pre('save',async function(next){
if(!this.isModified('password')) return next()
this.password=await bcrypt.hash(this.password,10);
})

//compare passeord

userSchema.methods.comparepas=async function(userpassword){
return await bcrypt.compare(userpassword,this.password)
}

//jwt
userSchema.methods.genertetoken=function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })
}

const user=mongoose.model("User",userSchema)


module.exports=user;

