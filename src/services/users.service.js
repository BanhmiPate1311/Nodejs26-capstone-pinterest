const { AppError } = require("../helpers/error");
const { User } = require("../models");

const getUsers = async () => {
  try {
    const users = await User.findAll({
      include: "images",
    });
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createUser = async (data) => {
  try {
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });
    if (user) {
      throw new AppError(400, "Email is existed");
    }

    // Trong trường hợp admin thêm user, chỉ cần dùng email, ta cần phải tạo một mật khẩu ngẫu nhiên
    if (!data.password) {
      data.password = Math.random().toString(36).substring(2);
      // Gửi email về cho user mật khẩu này
    }

    const createdUser = await User.create(data);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsers,
  createUser,
};
