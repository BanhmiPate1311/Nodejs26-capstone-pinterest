// Controller nhận vào request, response
// Nhiệm vụ: chỉ parse request (params, body) sau đó chuyển xuống Service xử lý, nhận kết quả trả về từ Service và trả response về cho client
const { response } = require("../helpers/response");
const userService = require("../services/users.service");

const getUsers = () => {
  return async (req, res, next) => {
    try {
      const users = await userService.getUsers();
      res.status(200).json(response(users));
    } catch (error) {
      next(error);
    }
  };
};

// POST: /users - body: {email, password, fullName, age, avatar}
const createUser = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      const file = req.file;
      if (file) {
        file.path = file.path.replace(/\\/g, "/"); // Đối với window

        data.avatar = `http://localhost:4000/${file.path}`;
      }
      const createdUser = await userService.createUser(data);
      res.status(200).json(response(createdUser));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getUsers,
  createUser,
};
