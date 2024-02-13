const multer=require("multer")

const storage=multer.memoryStorage()

const singleupload=multer({storage}).single("file")

module.exports=singleupload