const User = require("../../model/user/User");

//* register
const regCtrl = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    //!check if user exists
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.json({ status: "failed", data: "User already exists" });
    }
    //!hashed password

    //!register user
    const user = await User.create({
      fullName,
      email,
      password,
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
const logCtrl = async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User login ",
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
