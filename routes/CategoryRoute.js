const express=require("express")
const router=express.Router()
const auth = require("../middlewares/Authmiddleware");
const isAdmin=require('../middlewares/Adminauth')
const {CreateCatController, GetallcatController, DeletcatController, UpdatecatController} = require("../controllers/CategoryController");


//create category
router.post("/create",auth,isAdmin,CreateCatController)

//get all
router.get("/get-allcat",GetallcatController)

//delete cat
router.delete("/cat/:id",auth,isAdmin,DeletcatController)

//update cat
router.put("/updatecat/:id",auth,isAdmin,UpdatecatController)

module.exports=router