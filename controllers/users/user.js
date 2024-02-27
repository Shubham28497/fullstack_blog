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
    console.log(req.session);
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
  // console.log(req.params);
  try {
    //* get user id from params
    const userId = req.params.id;
    //*find user
    const user = await User.findById(userId);
    res.json({
      status: "Success",
      data: user,
    });
  } catch (err) {
    res.json(err);
  }
};
//*profile
const profileCtrl = async (req, res) => {
  try {
    //* get the user login
    const userId = req.session.userAuth;
    //* find the user
    const user = await User.findById(userId);
    res.json({
      status: "Success",
      data: user,
    });
  } catch (err) {
    res.json(err);
  }
};
//*phtoupload
const profilePhotoUploadCtrl = async (req, res, next) => {
  console.log(req.file.path);
  try {
    //* find user to be uploaded
    const userId = req.session.userAuth;
    const userFound = await User.findById(userId);
    //* check if user found
    if (!userFound) {
      return next(appErr("User not found", 403));
    }
    //* upload profile image
    await User.findByIdAndUpdate(
      userId,
      {
        profileImage: req.file.path,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "Success",
      data: "You have successfully updated your profile photo ",
    });
  } catch (err) {
    next(appErr(err.message));
  }
};
//* cover photo upload
const coverPhotoUploadCtrl = async (req, res, next) => {
  try {
    //* find user to be uploaded
    const userId = req.session.userAuth;
    const userFound = await User.findById(userId);
    //* check if user found
    if (!userFound) {
      return next(appErr("User not found", 403));
    }
    //* upload profile image
    await User.findByIdAndUpdate(
      userId,
      {
        coverImage: req.file.path,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "Success",
      data: "You have successfully updated your profile photo ",
    });
  } catch (err) {
    next(appErr(err.message));
  }
};
//*update pass

const updatePassCtrl = async (req, res, next) => {
  const { password } = req.body;
  try {
    //* check if user is updating the password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const passHashed = await bcrypt.hash(password, salt);
      //* update user
      await User.findByIdAndUpdate(
        req.params.id,
        {
          password: passHashed,
        },
        {
          new: true,
        }
      );
      res.json({
        status: "Success",
        user: "Password has been changed ",
      });
    }
  } catch (err) {
    return next(appErr("Please provide password field"));
  }
};
//*update user
const updateUserCtrl = async (req, res, next) => {
  const { fullName, email } = req.body;
  try {
    //*check if email is not taken
    if (email) {
      const emailTaken = await User.findOne({ email });
      if (emailTaken) {
        return next(appErr("Email is taken", 400));
      }
    }
    //* update the user
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        fullName,
        email,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "Success",
      data: user,
    });
  } catch (err) {
    return next(appErr(err.message));
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
