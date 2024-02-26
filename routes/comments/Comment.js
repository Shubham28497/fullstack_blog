const express = require("express");
const commentRoutes = express.Router();

//!POST/api/v1/comments
commentRoutes.post("/", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "comment created",
    });
  } catch (err) {
    res.json(err);
  }
});

//!GET/api/v1/comments/:id
commentRoutes.get("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Comments details",
    });
  } catch (err) {
    res.json(err);
  }
});
//!DEl/api/v1/comments/:id
commentRoutes.delete("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Comment delete",
    });
  } catch (err) {
    res.json(err);
  }
});
//!PUT/api/v1/comments/:id
commentRoutes.put("/:id", async (req, res) => {
  try {
    res.json({
      status: "Success",
      user: "Comment updated",
    });
  } catch (err) {
    res.json(err);
  }
});

















module.exports=commentRoutes
