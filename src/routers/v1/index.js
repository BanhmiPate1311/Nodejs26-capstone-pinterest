// Routers V1
const express = require("express");

const imageRouters = require("./images.route");
const userRouters = require("./users.route");
const authRouters = require("./auth.route");
const commentRouters = require("./comment.route");

// path v1: /api/v1
const v1 = express.Router();

// Định nghĩa các routers cho users
v1.use("/users", userRouters);

// Định nghĩa các routers cho images
v1.use("/images", imageRouters);

// Định nghĩa các routers cho authen
v1.use("/auth", authRouters);

// Định nghĩa các routers cho comment
v1.use("/comment", commentRouters);

module.exports = v1;
