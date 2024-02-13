const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    shippinginfo: {
        address: {
            type: String,
            required: [true, 'Address is required']
        },
        city: {
            type: String,
            required: [true, 'City is required']
        },
        country: {
            type: String,
            required: [true, 'Country is required']
        }
    },
    orderItems: [
        {
            name: {
                type: String,
                required: [true, 'Product name is required']
            },
            
            price:{
                type:Number,
                required:[true,'product price is requires']
            },
            quantity:{
                type:Number,
                required:[true,"product Quantity Required"]
            },
            image:{
                type:String,
                required:[true,'image is required']
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            }
        }
    ],
    paymentMethod:{
        type:String,
        enum:['COD','ONLINE'],
        default:'COD'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,'user id required']
    },
    paidAt:Date,
    paymentinfo:{
        id:String,
        status:String
    },
    itemPrice:{
        type:Number,
        required:[true,'itemPrice is Required']
    },
   tax:{
        type:Number,
        required:[true,'Tax Price is Required']
    },
    ShippingCharge:{
        type:Number,
        required:[true,'itemPrice is Required']
    },
    totalAmount:{
        type:Number,
        required:[true,'itme total amount required']
    },
    orderStatus:{
        type:String,
        enum:['processing','shipped','delivered'],
        default:"processing"
    },
    delivedAt:Date

},



{
    timestamps: true
});

const OrderModel = mongoose.model("Orders", OrderSchema);

module.exports = OrderModel;
