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
const protected = require("../../middlewares/protected");
const multer = require("multer");
const storage = require("../../config/cloudinary");
//* instance of multer
const upload = multer({ storage });

//* rendering form
userRoutes.get("/login", (req, res) => {
  res.render("users/login");
});
userRoutes.get("/register", (req, res) => {
  res.render("users/register");
});
userRoutes.get("/profile-page", (req, res) => {
  res.render("users/profile");
});
userRoutes.get("/upload-profile-photo", (req, res) => {
  res.render("users/uploadProfilePhoto");
});
userRoutes.get("/upload-cover-photo", (req, res) => {
  res.render("users/uploadCoverPhoto");
});
//* register
//!POST/register
userRoutes.post("/register", regCtrl);
//!POST/login
userRoutes.post("/login", logCtrl);
//!GET/profile/:id
userRoutes.get("/profile", protected, profileCtrl);
//!PUT/profile-photo-upload/:id
userRoutes.put(
  "/profile-photo-upload/",
  protected,
  upload.single("profile"),
  profilePhotoUploadCtrl
);
//!PUT/cover-photo-upload/:id
userRoutes.put(
  "/cover-photo-upload/",
  protected,
  upload.single("profile"),
  coverPhotoUploadCtrl
);
//!PUT/update-password/:id
userRoutes.put("/update-password/:id", updatePassCtrl);
//!PUT/update/:id
userRoutes.put("/update/:id", updateUserCtrl);
//!GET/:id
userRoutes.get("/:id", userDetailsCtrl);
//!GET/logout/:id
userRoutes.get("/logout", logoutCtrl);

module.exports = userRoutes;
