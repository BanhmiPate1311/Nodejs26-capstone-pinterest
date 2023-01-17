// Image Router
const express = require("express");
const imageController = require("../../controllers/image.controller");
const authorization = require("../../middlewares/authorization");
const upload = require("../../middlewares/upload");

// path userRouters: /api/v1/users
const imageRouters = express.Router();

// Định nghĩa các routes

imageRouters.get("", imageController.getImages());
imageRouters.post(
  "",
  authorization,
  upload.single("file"),
  imageController.createImage()
);
imageRouters.post("/save/:imageId", authorization, imageController.saveImage());
imageRouters.get(
  "/saveByUserId",
  authorization,
  imageController.getImagesSavedByUserId()
);
imageRouters.get(
  "/createdByUserId",
  authorization,
  imageController.getImagesCreatedByUserId()
);
imageRouters.get("/:imageId", imageController.getImageById());
imageRouters.get(
  "/save/:imageId",
  authorization,
  imageController.checkImageSavedByImageId()
);
imageRouters.delete(
  "/del/:imageId",
  authorization,
  imageController.delImageCreatedByImageId()
);

module.exports = imageRouters;
