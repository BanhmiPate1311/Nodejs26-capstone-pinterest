// Authenticate Router
const express = require("express");
const authController = require("../../controllers/auth.controller");
const authorization = require("../../middlewares/authorization");
const upload = require("../../middlewares/upload");

// path userRouters: /api/v1/users
const authRouters = express.Router();

// Định nghĩa các routes

// Register
authRouters.post("/login", authController.login());
authRouters.get("/profiles", authorization, authController.getProfile());
authRouters.put(
  "/update",
  authorization,
  upload.single("file"),
  authController.updateProfile()
);

module.exports = authRouters;
