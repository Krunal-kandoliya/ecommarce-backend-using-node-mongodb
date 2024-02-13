const mongoose=require("mongoose")

const reviewSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "name is require"],
      },
      rating: {
        type: Number,
        default: 0,
      },
      comment: {
        type: String,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "user require"],
      },
    },
    { timestamps: true }
  );


const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"product Name is Required"]
    },
    description:{
        type:String,
        required:[true,"Product Description is Required"]
    },
    price:{
        type:String,
        required:[true,"price is require"]
    },
    stock:{
        type:Number,
        required:[true,"stock is requires"]
    },
    // quantity:{
    //     type:Number,
    //     required:[true,"PRoduct quantity is required is requires"]
    // },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Catogory"
    },
    images:[
        {public_id:String,
        url:String
        }
    ],
    reviews:[reviewSchema],
    rating:{
        type:Number,
        default:0
    },
    numreview:{
        type:Number,
        default:0
    }
},{timestamps:true})

const product=mongoose.model("Product",productSchema)


module.exports=product;