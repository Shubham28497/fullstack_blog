const express = require("express");
const {
  regCtrl,
  logCtrl,
  userDetailsCtrl,
  profileCtrl,
  profilePhotoUploadCtrl,
  coverPhotoUploadCtrl,
  updatePassCtrl,
  updateUserCtrl,
  logoutCtrl,
} = require("../../controllers/users/user");
const userRoutes = express.Router();
const protected= require('../../middlewares/protected')
//* register
//!POST/register
userRoutes.post("/register", regCtrl);
//!POST/login
userRoutes.post("/login", logCtrl);
//!GET/:id
userRoutes.get("/:id", userDetailsCtrl);
//!GET/profile/:id
userRoutes.get("/profile/:id", protected, profileCtrl);
//!PUT/profile-photo-upload/:id
userRoutes.put("/profile-photo-upload/:id", profilePhotoUploadCtrl);
//!PUT/cover-photo-upload/:id
userRoutes.put("/cover-photo-upload/:id", coverPhotoUploadCtrl);
//!PUT/update-password/:id
userRoutes.put("/update-password/:id", updatePassCtrl);
//!PUT/update/:id
userRoutes.put("/update/:id", updateUserCtrl);
//!GET/logout/:id
userRoutes.get("/logout", logoutCtrl);

module.exports = userRoutes;
