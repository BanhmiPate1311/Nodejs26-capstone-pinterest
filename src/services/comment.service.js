const { AppError } = require("../helpers/error");
const { Comment, User, Image } = require("../models");

const createComment = async (data) => {
  try {
    const user = await User.findByPk(data.userId);

    if (!user) {
      throw new AppError(400, "User not found");
    }
    const image = await Image.findByPk(data.imageId);
    if (!image) {
      throw new AppError(400, "Image not found");
    }
    await Comment.create(data);

    return null;
  } catch (error) {
    throw error;
  }
};

const getCommentsByImageId = async (imageId) => {
  try {
    const image = await Image.findByPk(imageId);
    if (!image) {
      throw new AppError(400, "Image not found");
    }
    // console.log(image.__proto__);
    const comments = await Comment.findAll({ where: { imageId } });

    return comments;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createComment,
  getCommentsByImageId,
};
