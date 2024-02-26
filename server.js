const express = require("express");
const app = express();
require("dotenv").config();
require("./config/dbConnect");

//* user route
//!POST/api/v1/users/register
app.post("/api/v1/users/register ", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User Registered ",
    });
  } catch (err) {
    res.json(err);
  }
});
//!POST/api/v1/users/login
app.post("/api/v1/users/login ", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User login ",
    });
  } catch (err) {
    res.json(err);
  }
});
//!GET/api/v1/users/:id
app.get("/api/v1/users/:id ", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User details ",
    });
  } catch (err) {
    res.json(err);
  }
});
//!GET/api/v1/users/profile/:id
app.get("/api/v1/users/profile/:id ", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User details ",
    });
  } catch (err) {
    res.json(err);
  }
});
//!PUT/api/v1/users/profile-photo-upload/:id
app.put("/api/v1/users/profile-photo-upload/:id ", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User profile image upload ",
    });
  } catch (err) {
    res.json(err);
  }
});
//!PUT/api/v1/users/cover-photo-upload/:id
app.put("/api/v1/users/cover-photo-upload/:id ", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User cover image upload ",
    });
  } catch (err) {
    res.json(err);
  }
});
//!PUT/api/v1/users/update-password/:id
app.put("/api/v1/users/update-password/:id ", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User update password ",
    });
  } catch (err) {
    res.json(err);
  }
});
//!GET/api/v1/users/profile/:id
app.get("/api/v1/users/logout ", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "User logout ",
    });
  } catch (err) {
    res.json(err);
  }
});

//*post route
//!POST/api/v1/users/posts
app.post("/api/v1/users/posts ", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Post created",
    });
  } catch (err) {
    res.json(err);
  }
});
//!GET/api/v1/users/posts
app.get("/api/v1/users/posts ", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Posts list",
    });
  } catch (err) {
    res.json(err);
  }
});
//!GET/api/v1/users/posts/:id
app.get("/api/v1/users/posts/:id ", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Posts details",
    });
  } catch (err) {
    res.json(err);
  }
});
//!DEl/api/v1/users/posts/:id
app.delete("/api/v1/users/posts/:id ", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Post delete",
    });
  } catch (err) {
    res.json(err);
  }
});
//!PUT/api/v1/users/posts/:id
app.put("/api/v1/users/posts/:id ", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Post updated",
    });
  } catch (err) {
    res.json(err);
  }
});

//*comment route
//!POST/api/v1/users/comments
app.post("/api/v1/users/comments ", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "comment created",
    });
  } catch (err) {
    res.json(err);
  }
});

//!GET/api/v1/users/comments/:id
app.get("/api/v1/users/comments/:id ", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Comments details",
    });
  } catch (err) {
    res.json(err);
  }
});
//!DEl/api/v1/users/comments/:id
app.delete("/api/v1/users/comments/:id ", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Comment delete",
    });
  } catch (err) {
    res.json(err);
  }
});
//!PUT/api/v1/users/comments/:id
app.put("/api/v1/users/comments/:id ", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Comment updated",
    });
  } catch (err) {
    res.json(err);
  }
});
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));
