const categ=require('../models/Category')
const productmodal = require("../models/producModel");



const CreateCatController=async(req,res)=>{
try {
    const{category}=req.body
    if(!category){
        return res.status(404).send({
            success:false,
            message:"please provide category"
        })
    }
    await categ.create({category})
    res.status(200).send({
        success:true,
        message:"category Created Succesfull"
    })
    
} catch (error) {
    console.log(error)
    res.status(404).send({
        success:false,
        message:"category Not Added"
    })
}
}

const GetallcatController=async(req,res)=>{
try {
    const getallcat=await categ.find({})
    res.status(200).send({
        success:true,
        message:"Fetched all category",
        totalCategory:getallcat.length,
        getallcat
    })
} catch (error) {
    console.log(error)
    res.status(400).send({
        success:false,
        message:"Category Not FeTched"
    })
}
}

//delete category

const DeletcatController = async (req, res) => {
    try {
        const category = await categ.findById(req.params.id);
        if (!category) {
            return res.status(400).send({
                success: false,
                message: "category not found",
            });
        }

        // Find products with this category id
        const products = await productmodal.find({ category: category._id });

        // Iterate through products and update the category
        // for (let i = 0; i < products.length; i++) {
        //     const prdc = products[i];
        //     prdc.category = undefined;
        //     await prdc.save();
        // }
        products.map(async(e,i)=>{
            const pdcd=e
            pdcd.category=undefined
            await pdcd.save()
        })
        // Delete the category
        await category.deleteOne();

        res.status(200).send({
            success: true,
            message: "category deleted successfully",
        });
    } catch (error) {
        console.log(error);
        if (error.name === "CastError") {
            return res.status(500).send({
                success: false,
                message: "invalid id",
            });
        }
    }
};

const UpdatecatController=async(req,res)=>{
    try {
        const {id}=req.params
        const{updatecat}=req.body
        const category=await categ.findById(id)
        if(!category){
            return res.status(400).send({
                success:false,
                message:"category NOt Found"
            })
        }
        const produ=await productmodal.find({category:category._id})
        produ.map(async(e,i)=>{
            const adjs=e
            adjs.category=updatecat
            console.log(adjs)
            await adjs.save()
        })
        if(updatecat)category.category=updatecat
        await category.save()
        
res.status(200).send({
    success:true,
    message:"category Updated Succesfull"
})

    } catch (error) {
       console.log(error) 
       if (error.name === "CastError") {
        return res.status(500).send({
            success: false,
            message: "invalid id",
        });
    }
    }
}





module.exports={CreateCatController,GetallcatController,DeletcatController,UpdatecatController}