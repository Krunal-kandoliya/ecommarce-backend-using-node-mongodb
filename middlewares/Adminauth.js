const isadmin=async(req,res,next)=>{
    if (req.user.role !== "admin") {
        return res.status(401).send({
          success: false,
          message: "admin only",
        });
      }
      next();
}
module.exports=isadmin