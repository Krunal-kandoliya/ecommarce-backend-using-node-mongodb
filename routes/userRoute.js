const express = require("express");
const router = express.Router();
const {
  registercontroller,
  logincntroller,
  getuserprofilescontroller,
  logoutcontroller,
  updateprofilecontroller,
  updatepassword,
  updateprofilepicture,
  resetpassword,
  singleuser
  
} = require("../controllers/Usercontroller");
const auth = require("../middlewares/Authmiddleware");
const singleupload = require("../middlewares/multer");


//register
router.post("/register", registercontroller);

//login
router.post("/login", logincntroller);

//user profile

router.get("/profiles", auth, getuserprofilescontroller);

//logout
router.get("/logout", auth, logoutcontroller);

//update
router.put("/profile-update", auth, updateprofilecontroller);

//update password
router.put('/update-password',auth,updatepassword)

//update profile pic

router.put('/update-picture',singleupload,auth,updateprofilepicture)

//reset password

router.post('/reset-password',resetpassword)

//single user
router.get('/single-user/:id',singleuser)


module.exports = router;
