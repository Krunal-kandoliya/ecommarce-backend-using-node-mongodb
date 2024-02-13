const express = require("express");
const colors=require('colors')
const morgan=require('morgan')
const cors=require('cors')
const dotenv=require('dotenv')
const app = express();
const TestRoute=require('./routes/TestRoute');
const userRoute=require('./routes/userRoute')
const productRoute=require('./routes/ProductRouter')
const categoryRoute=require('./routes/CategoryRoute')
const order=require('./routes/OrderRoute')
const  connectDB  = require("./config/db");
const cookieParser = require("cookie-parser");
const cloudinary=require("cloudinary")


//config
dotenv.config()

//middlewares 

app.use(morgan('dev'))
app.use(express.json())

app.use(cors())
app.use(cookieParser())

//port

const PORT=process.env.PORT || 8080

//connectdb

connectDB()

//cloudnuary
cloudinary.v2.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_SECRET
});

//stripe config
// const Stripe=require('stripe')
// const stripe = new Stripe(process.env.STRIPE_API_SECRET);
// module.exports.stripe = stripe;

module.exports.stripe=require('stripe')('sk_test_51ObRSySHXUG0cEmPBXcUeUTWaTZZxhtutjVseSvbd2BiouJq0LD7Er3pVGINyjsP7T7KQHfk7B6nqKziIDnLbiqL00lJWTPrsO')

//route
app.use("/api/v1",TestRoute);
app.use("/api/v1/user",userRoute)
app.use("/api/v1/product",productRoute)
app.use("/api/v1/category",categoryRoute)
app.use("/api/v1/order",order)




app.get("/", (req, res) => {
  return res.status(200).send({
    success: true,
    message: "ok",
  });
});

app.listen(PORT, () => {
  console.log(`server is running ${process.env.PORT}`.bgYellow.blue);
});
