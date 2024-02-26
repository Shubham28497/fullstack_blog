const express = require("express");
const userRoutes = express.Router();

//* register
//!POST/register
userRoutes.post("/register", async (req, res) => {try {
  res.json({
    status: "Success",
    user: "User registered ",
  });
} catch (err) {
  res.json(err);
}});
//!POST/login
userRoutes.post("/login", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User login ",
    });
  } catch (err) {
    res.json(err);
  }
});
//!GET/:id
userRoutes.get("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User details ",
    });
  } catch (err) {
    res.json(err);
  }
});
//!GET/profile/:id
userRoutes.get("/profile/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User profile ",
    });
  } catch (err) {
    res.json(err);
  }
});
//!PUT/profile-photo-upload/:id
userRoutes.put("/profile-photo-upload/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User profile image upload ",
    });
  } catch (err) {
    res.json(err);
  }
});
//!PUT/cover-photo-upload/:id
userRoutes.put("/cover-photo-upload/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User cover image upload ",
    });
  } catch (err) {
    res.json(err);
  }
});
//!PUT/update-password/:id
userRoutes.put("/update-password/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User update password ",
    });
  } catch (err) {
    res.json(err);
  }
});
//!PUT/update/:id
userRoutes.put("/update/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User update  ",
    });
  } catch (err) {
    res.json(err);
  }
});
//!GET/logout/:id
userRoutes.get("/logout", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User logout ",
    });
  } catch (err) {
    res.json(err);
  }
});


module.exports = userRoutes;
