const bcrypt = require("bcryptjs");
const User = require("../../model/user/User");
const appErr = require("../../utils/appErr");

//* register
const regCtrl = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  console.log("get req", req.body);
  if (!fullName || !email || !password) {
    // return next(appErr("All fields are required"));
    return res.render("users/register", {
      error: "All fields are required",
    });
  }
  try {
    //!check if user exists
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.render("users/register", {
        error: "Exist is taken",
      });
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
    //redirect after registration
    res.redirect("/api/v1/users/profile-page");
  } catch (error) {
    res.json(error);
  }
};
//*login
const logCtrl = async (req, res, next) => {
  // console.log(req.session)
  const { email, password } = req.body;
  if (!email || !password) {
    // return next(appErr("All fields are required"));
    return res.render("users/login", {
      error: "All fields are required",
    });
  }

  try {
    //!check if the email exists
    const userFound = await User.findOne({ email });
    if (!userFound) {
      //! throw an error
    //  return next(appErr("Invalid credentails"));
       return res.render("users/login", {
         error: "Invalid credentails",
       });
    }
    //! verify password
    const isPassValid = await bcrypt.compare(password, userFound.password);
    if (!isPassValid) {
      //! throw an error
      //return next(appErr("Invalid credentails"));
       return res.render("users/login", {
         error: "Invalid credentails",
       });
    }
    //! save the user info
    req.session.userAuth = userFound._id;
    console.log(req.session);
    res.redirect("/api/v1/users/profile-page");
  } catch (error) {
    res.json(error);
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
    
    res.render("users/updateUser", {
      user,
      error: "",
    });
  } catch (error) {
     res.render("users/updateUser", {
       error: error.message
       
     });
  }
};
//*profile
const profileCtrl = async (req, res) => {
  try {
    //* get the user login
    const userId = req.session.userAuth;
    //* find the user
    const user = await User.findById(userId)
      .populate("posts")
      .populate("comments");
   res.render("users/profile",{user})
  } catch (error) {
    res.json(error);
  }
};
//*phtoupload
const profilePhotoUploadCtrl = async (req, res, next) => {
  // console.log(req.file.path);
  //*check if file exists
  
  try {
    if (!req.file) {
      return res.render("users/uploadProfilePhoto", {
        error: "Please upload image",
      });
    }
    //* find user to be uploaded
    const userId = req.session.userAuth;
    const userFound = await User.findById(userId);
    //* check if user found
    if (!userFound) {
      return res.render("users/uploadProfilePhoto", {
        error: "User not found",
      });
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
    //redirect
    res.redirect("/api/v1/users/profile-page");
    // res.json({
    //   status: "Success",
    //   data: "You have successfully updated your profile photo ",
    // });
  } catch (error) {
    return res.render("users/uploadProfilePhoto", {
      error: error.message,
    });
  }
};
//* cover photo upload
const coverPhotoUploadCtrl = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.render("users/uploadProfilePhoto", {
        error: "Please upload image",
      });
    }
    //* find user to be uploaded
    const userId = req.session.userAuth;
    const userFound = await User.findById(userId);
    //* check if user found
    if (!userFound) {
      return res.render("users/uploadProfilePhoto", {
        error: "User not found",
      });
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
    res.redirect("/api/v1/users/profile-page");

    // res.json({
    //   status: "Success",
    //   data: "You have successfully updated your profile photo ",
    // });
  } catch (error) {
    return res.render("users/uploadProfilePhoto", {
      error: error.message,
    });
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
        req.session.userAuth,
        {
          password: passHashed,
        },
        {
          new: true,
        }
      );
      // res.json({
      //   status: "Success",
      //   user: "Password has been changed ",
      // });
    res.redirect("/api/v1/users/profile-page");

    }
  } catch (error) {
    return res.render("users/updateUser", {
      error: error.message,
      user: "",
    });
  }
};
//*update user
const updateUserCtrl = async (req, res, next) => {
  const { fullName, email } = req.body;
  try {
    if(!fullName || !email){
      return res.render("users/updateUser", {
        error: "Please provide the details",
        user: "",
      });
    }
    //*check if email is not taken
    if (email) {
      const emailTaken = await User.findOne({ email });
      if (emailTaken) {
       return res.render("users/updateUser", {
         error: "Email is taken",
         user:"",
       });
      }
    }
    //* update the user
     await User.findByIdAndUpdate(
      req.session.userAuth,
      {
        fullName,
        email,
      },
      {
        new: true,
      }
    );
    res.redirect("/api/v1/users/profile-page");
  } catch (error) {
    return res.render("users/updateUser", {
      error: error.message,
      user:""
    });
  }
};

//*logout
const logoutCtrl = async (req, res) => {
  //* destroy sesson
  req.session.destroy(()=>{
    res.redirect("/api/v1/users/login")
  })
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
