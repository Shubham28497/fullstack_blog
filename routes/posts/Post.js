const express = require("express");
const {
  postCreatedCtrl,
  getPostCtrl,
  postDetailsCtrl,
  delPostCtrl,
  updatePostCtrl,
} = require("../../controllers/posts/post");
const protected = require("../../middlewares/protected");
const multer = require("multer");
const storage = require("../../config/cloudinary");
const postRoutes = express.Router();
//* instance of multer
const upload = multer({ storage });
//* forms
postRoutes.get("/get-post-form",(req,res)=>{
  res.render("posts/addPost",{error:""})
})
//!POST/api/v1/posts
postRoutes.post("/", protected, upload.single("file"), postCreatedCtrl);
//!GET/api/v1/posts
postRoutes.get("/", getPostCtrl); //fetchposts
//!GET/api/v1/posts/:id
postRoutes.get("/:id", postDetailsCtrl); //fetch post
//!DEl/api/v1/posts/:id
postRoutes.delete("/:id", protected, delPostCtrl);
//!PUT/api/v1/posts/:id
postRoutes.put("/:id", protected, upload.single("file"), updatePostCtrl);

module.exports = postRoutes;
