const usermodel = require("../models/User.modal");
const getDtauri = require("../utils/features");
const cloudinary=require("cloudinary")
const registercontroller = async (req, res) => {
  try {
    const { name, email, password, address, city, country, phone,answer } = req.body;
    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !city ||
      !country ||
      !phone ||
      !answer
    ) {
      return res.status(500).send({
        success: false,
        message: "please provide all fields",
      });
    }
    // check existing user
    const existinguser = await usermodel.findOne({ email });
    if (existinguser) {
      return res.status(500).send({
        success: false,
        message: "user already existing",
      });
    }

    const user = await usermodel.create({
      name,
      email,
      password,
      address,
      city,
      country,
      phone,
      answer
    });
    res.status(200).send({
      success: true,
      message: "Registration Successfull",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register api",
      error,
    });
  }
};

//login

const logincntroller = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "add email and password",
      });
    }

    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not FOund",
      });
    }
    //check pass
    const ismatch = await user.comparepas(password);
    user.password=undefined
    //vavlidation
    if (!ismatch) {
      return res.status(500).send({
        success: false,
        message: "invalid password",
      });
    }
    //tokne
    const token = await user.genertetoken();
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "devlopment" ? true : false,
        httpOnly: process.env.NODE_ENV === "devlopment" ? true : false,
      })
      .send({
        success: true,
        message: "Login Succesfull",
        user,
        token,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

const getuserprofilescontroller = async (req, res) => {
  try {
    const user = await usermodel.findById(req.user._id);
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "user profile succesfull fethced",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in profile",
      error,
    });
  }
};

//logout

const logoutcontroller = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        secure: process.env.NODE_ENV === "devlopment" ? true : false,
        httpOnly: process.env.NODE_ENV === "devlopment" ? true : false,
      })
      .send({
        success: true,
        message: "logout succesfull",
      });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Logout Successfull",
    });
  }
};

const updateprofilecontroller = async(req,res) => {
try {
  const {name,email,address,city,country,phone}=req.body
  const user=await usermodel.findById(req.user._id)
  //validtion
  if(name)user.name=name
  if(email)user.email=email
  if(address)user.address=address
  if(city)user.city=city
  if(country)user.country=country
  if(phone)user.phone=phone
  await user.save()
  res.status(200).send({
    success:true,
    message:"User Profile Successfull"
  })
} catch (error) {
  console.log(error);
    res.status(404).send({
      success: false,
      message: "Logout Successfull",
    });
}
};

const updatepassword=async(req,res)=>{
try {
const user=await usermodel.findById(req.user._id)
const{oldpassword,newpassword}=req.body
if(!oldpassword || !newpassword){
  return res.status(500).send({
    success:false,
    message:"please provides all the fields"
  })
}
//old pass
const match=await user.comparepas(oldpassword)
//validtion
if(!match){
  return res.status(500).send({
    success:false,
    message:"invalid password"
  })
}
user.password=newpassword
await user.save()
res.status(200).send({
  success:true,
  message:"password Updated Succcesfull"
})
} catch (error) {
  console.log(error);
    res.status(404).send({
      success: false,
      message: "Logout Successfull",
      error
    });
}
}


//update user profike photo

const updateprofilepicture=async(req,res)=>{
try {
  const user=await usermodel.findById(req.user._id)
  //get the file from the client
  const file=getDtauri(req.file)
  //delete preves image
  await cloudinary.v2.uploader.destroy(user.profilepic.public_id)
  //update
  const cdb=await cloudinary.v2.uploader.upload(file.content)
  user.profilepic={
    public_id:cdb.public_id,
    url:cdb.secure_url
  }

  await user.save()
  res.status(200).send({
    success:true,
    message:"profile picture updated"
  })
} catch (error) {
  console.log(error);
  res.status(404).send({
    success: false,
    message: "profile not updated",
    error
  });
}
}

//forgot password

const resetpassword=async(req,res)=>{
  try {
    const{email,answer,newpassword}=req.body
    if(!email || !answer || !newpassword){
      return res.status(500).send({
        success:false,
        message:"please provide all the fields"
      })
    }
const user=await usermodel.findOne({email,answer})
if(!user){
  return res.status(404).send({
    success:false,
    message:"INvalid user "
  })
}

user.password=newpassword
await user.save()
res.status(200).send({
  success:true,
  message:"your password reset succesfull"
})
  } catch (error) {
    console.log(error)
    res.status(404).send({
      success:false,
      message:"Passsword not reset"
    })
  }
}

const singleuser = async (req, res) => {
  try {
    const { id } = req.params;
    const singleUser = await usermodel.findById({ _id: id });

    if (!singleUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // If user is found, send it in the response
    res.status(200).send({
      success: true,
      message: "Single user fetched successfully",
      singleUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "API not working",
    });
  }
};

module.exports = singleuser;


module.exports = {
  registercontroller,
  logincntroller,
  getuserprofilescontroller,
  logoutcontroller,
  updateprofilecontroller,
  updatepassword,
  singleuser,
  updateprofilepicture,resetpassword
};
