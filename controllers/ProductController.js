const product = require("../models/producModel");
const productmodal = require("../models/producModel");
const getDtauri = require("../utils/features");
const cloudinary = require("cloudinary");

const getAllProductController = async (req, res) => {
  const {keyword,category}=req.query

  try {
    const product = await productmodal.find({
      description:{
        $regex:keyword ? keyword : "",
        $options:"i"
      },
      category:category ? category : undefined
    }).populate("category")
    res.status(200).send({
      success: true,
      totalproducts:product.length,
      message: "all product Fetched Succesfull",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get All products",
    });
  }
};

const singleController = async (req, res) => {
  try {
    const singleprod = await productmodal.findById(req.params.id);
    if (!singleprod) {
      return res.status(404).send({
        success: false,
        message: "Product nOt Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "product Found",
      singleprod,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "CastError") {
      res.status(500).send({
        success: false,
        message: "invalid id",
      });
    }
  }
};

const createprodController = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    if (!name || !description || !price || !stock) {
      return res.status(500).send({
        success: false,
        message: "please provide All Fields",
      });
    }
    if (!req.file) {
      return res.status(500).send({
        success: false,
        message: "please Provide Product Image",
      });
    }
    const file = getDtauri(req.file);
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    const image = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };
    await productmodal.create({
      name,
      description,
      price,
      stock,
      category,
      stock,
      images: [image],
    });
    res.status(200).send({
      success: true,
      message: "product created Sucessfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get All products",
    });
  }
};

// const updateProduct

const updateProducController = async (req, res) => {
  try {
    const product = await productmodal.findById(req.params.id);

    if (!product) {
      return res.status(400).send({
        success: false,
        message: "Product Not Found",
      });
    }

    const { name, description, price, stock, category } = req.body;
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;

    await product.save();

    res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    if (error.name === "CastError") {
      res.status(500).send({
        success: false,
        message: "Invalid id",
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Error in updating products",
      });
    }
  }
};

const updateproductimgController = async (req, res) => {
  try {
    //find product

    const product = await productmodal.findById(req.params.id);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "product img not found",
      });
    }
    //check file
    if (!req.file) {
      return res.status(404).send({
        success: true,
        message: "Product not foinf",
      });
    }

    const file = getDtauri(req.file);
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    const img = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };
    //
    product.images.push(img);
    await product.save();
    res.status(200).send({
      success: true,
      message: "product image updaeteded",
    });
  } catch (error) {
    console.log(error);
    if (error.name === "CastError") {
      res.status(500).send({
        success: false,
        message: "Invalid id",
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Error in updating products",
      });
    }
  }
};

//delete imge deleted

const deleteimg=async(req,res)=>{
    try {

        const product=await productmodal.findById(req.params.id)

        if(!product){
            return res.status(404).send({
                success:false,
                message:"product not found"
            })
        }
        //imge id finf
        const id=req.query.id
        if(!id){
            return res.status(404).send({
                success:false,
                message:"invalid id"
            })

        }

        let exist=-1
        product.images.map((item,i)=>{
            if(item._id.toString() === id.toString()) exist=i
        })
        if(exist < 0){
            return res.status(404).send({
                success:true,
                message:"imge not found"
            })
        }
        await cloudinary.v2.uploader.destroy(product.images[exist].public_id)
        product.images.splice(exist,1)
        await product.save()
        return res.status(200).send({
            success:true,
            message:"product imge deleted succesfull"
        })
    } catch (error) {
        console.log(error);
        if (error.name === "CastError") {
          res.status(500).send({
            success: false,
            message: "Invalid id",
          });
        } else {
          res.status(500).send({
            success: false,
            message: "Error in updating products",
          });
        }   
    }
}

const deleteproduct=async(req,res)=>{
    try {
        const product=await productmodal.findById(req.params.id)
        if(!product){
            return res.status(404).send({
                success:false,
                message:"product not found"
            })
        }
//find and delte imge in cloudinry
for (let index = 0; index < product.images.length; index++) {
    await cloudinary.v2.uploader.destroy(product.images[index].public_id)
    
}
await product.deleteOne();
res.status(200).send({
    success:true,
    message:"product deleted succesfull"
})


    } catch (error) {
        console.log(error);
        if (error.name === "CastError") {
          res.status(500).send({
            success: false,
            message: "Invalid id",
          });
        } else {
          res.status(500).send({
            success: false,
            message: "Error in updating products",
          });
        }   
  
    }
}

const productreview = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const product = await productmodal.findById(req.params.id);
    const alreadyrevirew = product.reviews.map(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyrevirew) {
      return res.status(400).send({
        success: false,
        message: "Product already reviewed",
      });
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numreview = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.status(200).send({
      success: true,
      message: "Review added",
    });
  } catch (error) {
    console.log(error)
    if (error.name === "CastError") {
      res.status(500).send({
        success: false,
        message: "Invalid id",
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Error in Review Comment Api products",
      });
    }
  }
};

const topproducts = async (req, res) => {
  try {
    const products = await productmodal.find({}).sort({ rating: -1 }).limit(3);
    console.log(products);
    res.status(200).send({
      success: true,
      message: "Top Products",
      products,  // Corrected variable name
    });
  } catch (error) {
    console.error(error);
    res.status(404).send({
      success: false,
      message: "Products Not Found",
    });
  }
};

module.exports = {
  getAllProductController,
  singleController,
  createprodController,
  updateProducController,
  updateproductimgController,
  deleteimg,
  deleteproduct,productreview,topproducts
};
