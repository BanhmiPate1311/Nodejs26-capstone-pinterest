const { Image, User, ImageSave } = require("../models");
const { Op } = require("sequelize");
const { AppError } = require("../helpers/error");
const fs = require("fs");

const getImages = async (name = "") => {
  try {
    const images = await Image.findAll({
      where: {
        imageName: {
          [Op.substring]: name,
        },
      },
      include: "user",
    });
    return images;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createImage = async (data) => {
  try {
    console.log("data: ", data);
    const image = await Image.create(data);
    return image;
  } catch (error) {
    throw error;
  }
};

const getImageById = async (imageId) => {
  try {
    const image = await Image.findByPk(imageId, {
      include: "user",
    });

    if (!image) {
      throw new AppError(404, "Image not found");
    }

    return image;
  } catch (error) {
    throw error;
  }
};

const saveImage = async (userId, imageId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }

    const image = await Image.findByPk(imageId);
    if (!image) {
      throw new AppError(400, "Image not found");
    }
    console.log(image.__proto__);
    const hasSaved = await image.hasUserSave(user.userId);
    if (hasSaved) {
      await image.removeUserSave(user.userId);
    } else {
      await image.addUserSave(user.userId);
    }

    return null;
  } catch (error) {
    throw error;
  }
};

const checkImageSavedByImageId = async (userId, imageId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }

    const image = await Image.findByPk(imageId);
    if (!image) {
      throw new AppError(400, "Image not found");
    }
    // console.log(image.__proto__);
    const hasSaved = await image.hasUserSave(user.userId);
    console.log("hasSaved: ", hasSaved);
    return hasSaved;
  } catch (error) {
    throw error;
  }
};

const delImageCreatedByImageId = async (userId, imageId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }

    const image = await Image.findByPk(imageId);
    if (!image) {
      throw new AppError(400, "Image not found");
    }

    if (image.userId !== userId) {
      throw new AppError(403, "no have permission");
    }
    const location = "." + image.path.split("http://localhost:4000")[1];

    fs.unlinkSync(location);
    await image.destroy({ where: { imageId } });
    return null;
  } catch (error) {
    throw error;
  }
};

const getImagesSavedByUserId = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }

    // console.log(user.__proto__);
    const images = await User.findAll({
      where: {
        userId: user.userId,
      },
      include: "imageSaves",
    });

    return images;
  } catch (error) {
    throw error;
  }
};

const getImagesCreatedByUserId = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }

    // console.log(user.__proto__);
    const images = await User.findAll({
      where: {
        userId: user.userId,
      },
      include: "images",
    });

    return images;
  } catch (error) {
    throw error;
  }
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
