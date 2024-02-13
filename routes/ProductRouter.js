const express = require("express");
const {
  getAllProductController,
  singleController,
  createprodController,
  updateProducController,
  updateproductimgController,deleteimg,deleteproduct,productreview,topproducts
} = require("../controllers/ProductController");
const auth = require("../middlewares/Authmiddleware");
const singleupload = require("../middlewares/multer");
const isAdmin=require('../middlewares/Adminauth');

const router = express.Router();

//get all product

router.get("/get-all", getAllProductController);

// single product
router.get("/:id",isAdmin,auth ,singleController);

//create product
router.post("/create", auth, singleupload,isAdmin ,createprodController);

//update product
router.put("/:id", auth, isAdmin,updateProducController);

//update profile inage
router.put("/image/:id", auth,isAdmin,singleupload, updateproductimgController);

//delete img product

router.delete('/delete-imge/:id',isAdmin,auth,deleteimg)

//delete product

router.delete('/prod/delete/:id',isAdmin,auth,deleteproduct)

//review product

router.put('/review/:id',auth,productreview)


router.get('/top',topproducts)

module.exports = router;
