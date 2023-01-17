const { response } = require("../helpers/response");
const commentService = require("../services/comment.service");

const createComment = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      // console.log("data: ", data);
      const { user } = res.locals;
      const { imageId } = req.params;
      data.userId = user.userId;
      data.imageId = imageId;
      console.log("data: ", data);
      await commentService.createComment(data);
      res.status(200).json(response("OK"));
    } catch (error) {
      next(error);
    }
  };
};

const getCommentsByImageId = () => {
  return async (req, res, next) => {
    try {
      const { imageId } = req.params;
      const comments = await commentService.getCommentsByImageId(imageId);
      res.status(200).json(response(comments));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  createComment,
  getCommentsByImageId,
};
