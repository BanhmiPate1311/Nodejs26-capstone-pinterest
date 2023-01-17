// User Router
const express = require("express");
const userController = require("../../controllers/users.controller");
const authorization = require("../../middlewares/authorization");
const upload = require("../../middlewares/upload");

// path userRouters: /api/v1/users
const userRouters = express.Router();

// Định nghĩa các routes

userRouters.get("", userController.getUsers());
userRouters.post("", upload.single("file"), userController.createUser());

module.exports = userRouters;
