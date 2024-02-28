const express = require("express");
const {
  postCreatedCtrl,
  getPostCtrl,
  postDetailsCtrl,
  delPostCtrl,
  updatePostCtrl,
} = require("../../controllers/posts/post");
const protected = require("../../middlewares/protected");
const postRoutes = express.Router();
//!POST/api/v1/posts
postRoutes.post("/", protected, postCreatedCtrl);
//!GET/api/v1/posts
postRoutes.get("/", getPostCtrl);
//!GET/api/v1/posts/:id
postRoutes.get("/:id", postDetailsCtrl);
//!DEl/api/v1/posts/:id
postRoutes.delete("/:id", delPostCtrl);
//!PUT/api/v1/posts/:id
postRoutes.put("/:id", updatePostCtrl);

module.exports = postRoutes;
