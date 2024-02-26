const express = require("express");
const postRoutes = express.Router();

//!POST/api/v1/posts
postRoutes.post("/", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Post created",
    });
  } catch (err) {
    res.json(err);
  }
});
//!GET/api/v1/posts
postRoutes.get("/", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Posts list",
    });
  } catch (err) {
    res.json(err);
  }
});
//!GET/api/v1/posts/:id
postRoutes.get("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Posts details",
    });
  } catch (err) {
    res.json(err);
  }
});
//!DEl/api/v1/posts/:id
postRoutes.delete("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Post delete",
    });
  } catch (err) {
    res.json(err);
  }
});
//!PUT/api/v1/posts/:id
postRoutes.put("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Post updated",
    });
  } catch (err) {
    res.json(err);
  }
});

module.exports = postRoutes;
