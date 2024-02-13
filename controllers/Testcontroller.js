const Testcontroller=(req,res)=>{
    res.status(200).send({
        success:true,
        message:'this is test route'
    });
};

module.exports=Testcontroller