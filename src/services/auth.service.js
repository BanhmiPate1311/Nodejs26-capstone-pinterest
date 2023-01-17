const { AppError } = require("../helpers/error");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/jwt");

const login = async (credentials) => {
  try {
    const { email, password } = credentials;
    const user = await User.findOne({
      where: { email },
      attributes: { include: ["password"] },
    });
    console.log("user", user);
    if (!user) {
      throw new AppError(400, "email or password invalid");
    }

    const isMatched = bcrypt.compareSync(password, user.password);
    if (!isMatched) {
      throw new AppError(400, "email or password invalid");
    }

    // delete user.dataValues.password;
    // return user;
    return generateToken(user);
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (userId, data) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }

    const updatedProfile = await User.update(data, {
      where: {
        userId,
      },
    });

    return updatedProfile;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
  updateProfile,
};
