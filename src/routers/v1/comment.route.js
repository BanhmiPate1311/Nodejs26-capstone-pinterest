// Comment Router
const express = require("express");
const commentController = require("../../controllers/comment.controller");
const authorization = require("../../middlewares/authorization");

// path userRouters: /api/v1/users
const commentRouters = express.Router();

// Định nghĩa các routes

// POST comment
commentRouters.post(
  "/:imageId",
  authorization,
  commentController.createComment()
);
commentRouters.get("/:imageId", commentController.getCommentsByImageId());

module.exports = commentRouters;
