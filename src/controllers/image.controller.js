const { AppError } = require("../helpers/error");
const { response } = require("../helpers/response");
const imageService = require("../services/image.service");

const getImages = () => {
  return async (req, res, next) => {
    try {
      const { name } = req.query;
      const images = await imageService.getImages(name);
      res.status(200).json(response(images));
    } catch (error) {
      next(error);
    }
  };
};

const createImage = () => {
  return async (req, res, next) => {
    try {
      const { user } = res.locals;
      const data = req.body;
      const file = req.file;

      if (!file) {
        next(new AppError(400, "Please upload a file"));
      }
      file.path = file.path.replace(/\\/g, "/"); // Đối với window
      data.path = `http://localhost:4000/${file.path}`;
      // set userId là thông tin người tạo hình ảnh
      data.userId = user.userId;
      console.log("data: ", data);
      const image = await imageService.createImage(data);
      res.status(200).json(response(image));
    } catch (error) {
      next(error);
    }
  };
};

const getImageById = () => {
  return async (req, res, next) => {
    try {
      const { imageId } = req.params;
      const image = await imageService.getImageById(imageId);
      res.status(200).json(response(image));
    } catch (error) {
      next(error);
    }
  };
};

const saveImage = () => {
  return async (req, res, next) => {
    try {
      const { user } = res.locals;
      const { imageId } = req.params;
      await imageService.saveImage(user.userId, imageId);
      res.status(200).json(response("Saved"));
    } catch (error) {
      next(error);
    }
  };
};

const checkImageSavedByImageId = () => {
  return async (req, res, next) => {
    try {
      const { user } = res.locals;
      const { imageId } = req.params;
      const hasSaved = await imageService.checkImageSavedByImageId(
        user.userId,
        imageId
      );
      res.status(200).json(response(hasSaved));
    } catch (error) {
      next(error);
    }
  };
};

const delImageCreatedByImageId = () => {
  return async (req, res, next) => {
    try {
      const { user } = res.locals;
      const { imageId } = req.params;
      await imageService.delImageCreatedByImageId(user.userId, imageId);
      res.status(200).json(response("OK"));
    } catch (error) {
      next(error);
    }
  };
};

const getImagesSavedByUserId = () => {
  return async (req, res, next) => {
    try {
      const { user } = res.locals;
      const images = await imageService.getImagesSavedByUserId(user.userId);
      res.status(200).json(response(images));
    } catch (error) {
      next(error);
    }
  };
};

const getImagesCreatedByUserId = () => {
  return async (req, res, next) => {
    try {
      const { user } = res.locals;
      const images = await imageService.getImagesCreatedByUserId(user.userId);
      res.status(200).json(response(images));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getImages,
  createImage,
  getImageById,
  saveImage,
  checkImageSavedByImageId,
  delImageCreatedByImageId,
  getImagesSavedByUserId,
  getImagesCreatedByUserId,
};
