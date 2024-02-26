const express = require("express");
const {
  comCreatedCtrl,
  getComCtrl,
  delComCtrl,
  upComCtrl,
} = require("../../controllers/comments/comment");
const commentRoutes = express.Router();

//!POST/api/v1/comments
commentRoutes.post("/", comCreatedCtrl);

//!GET/api/v1/comments/:id
commentRoutes.get("/:id", getComCtrl);
//!DEl/api/v1/comments/:id
commentRoutes.delete("/:id", delComCtrl);
//!PUT/api/v1/comments/:id
commentRoutes.put("/:id", upComCtrl);

module.exports = commentRoutes;
