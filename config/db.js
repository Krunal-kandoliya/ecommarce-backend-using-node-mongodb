const mongoose=require('mongoose')
const color=require('colors')

 const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB COnnected ${mongoose.connection.host}`.bgCyan);
    } catch (error) {
       console.log(`MongoDB Error ${error}`.america) 
    }
}

module.exports=connectDB