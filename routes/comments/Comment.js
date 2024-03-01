const express = require("express");
const {
  comCreatedCtrl,
  getComCtrl,
  delComCtrl,
  upComCtrl,
} = require("../../controllers/comments/comment");
const commentRoutes = express.Router();
const protected = require("../../middlewares/protected");
//!POST/api/v1/comments
commentRoutes.post("/:id", protected, comCreatedCtrl);

//!GET/api/v1/comments/:id
commentRoutes.get("/:id", getComCtrl);
//!DEl/api/v1/comments/:id
commentRoutes.delete("/:id", protected, delComCtrl);
//!PUT/api/v1/comments/:id
commentRoutes.put("/:id", protected,upComCtrl);

module.exports = commentRoutes;
