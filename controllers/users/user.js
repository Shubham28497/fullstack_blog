const bcrypt = require("bcryptjs");
const User = require("../../model/user/User");
const appErr = require("../../utils/appErr");

//* register
const regCtrl = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return next(appErr("All fields are required"));
  }
  try {
    //!check if user exists
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appErr("User already exists"));
      //return res.json({ status: "failed", data: "User already exists" });
    }
    //!hashed password
    const salt = await bcrypt.genSalt(10);
    const passHashed = await bcrypt.hash(password, salt);
    //!register user
    const user = await User.create({
      fullName,
      email,
      password: passHashed,
    });
    res.json({
      status: "Success",
      data: user,
    });
  } catch (err) {
    res.json(err);
  }
};
//*login
const logCtrl = async (req, res, next) => {
  // console.log(req.session)
  const { email, password } = req.body;
  if (!email || !password) {
    return next(appErr("All fields are required"));
  }

  try {
    //!check if the email exists
    const userFound = await User.findOne({ email });
    if (!userFound) {
      //! throw an error
      return next(appErr("Invalid credentails"));
    }
    //! verify password
    const isPassValid = await bcrypt.compare(password, userFound.password);
    if (!isPassValid) {
      //! throw an error
      return next(appErr("Invalid credentails"));
    }
    //! save the user info
    req.session.userAuth = userFound._id;
    console.log(req.session)
    res.json({
      status: "Success",
      data: userFound,
    });
  } catch (err) {
    res.json(err);
  }
};
//*get user details
const userDetailsCtrl = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User detail ",
    });
  } catch (err) {
    res.json(err);
  }
};
//*profile
const profileCtrl = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User profile ",
    });
  } catch (err) {
    res.json(err);
  }
};
//*phtoupload
const profilePhotoUploadCtrl = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User profile image upload ",
    });
  } catch (err) {
    res.json(err);
  }
};
//* cover photo upload
const coverPhotoUploadCtrl = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User cover image upload ",
    });
  } catch (err) {
    res.json(err);
  }
};
//*update pass

const updatePassCtrl = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User update password ",
    });
  } catch (err) {
    res.json(err);
  }
};
//*update user
const updateUserCtrl = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User update  ",
    });
  } catch (err) {
    res.json(err);
  }
};

//*logout
const logoutCtrl = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User logout ",
    });
  } catch (err) {
    res.json(err);
  }
};
module.exports = {
  regCtrl,
  logCtrl,
  userDetailsCtrl,
  profileCtrl,
  profilePhotoUploadCtrl,
  coverPhotoUploadCtrl,
  updatePassCtrl,
  updateUserCtrl,
  logoutCtrl,
};
