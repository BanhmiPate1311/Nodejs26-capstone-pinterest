// Setup Sequelize
const { Sequelize } = require("sequelize");
const configs = require("../config");

const sequelize = new Sequelize(
  configs.DB_NAME,
  configs.DB_USER,
  configs.DB_PASSWORD,
  {
    dialect: configs.DB_DIALECT,
    host: configs.DB_HOST,
    port: configs.DB_PORT,
  }
);

// Kiểm tra kết nối tới DB
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize Connected");
  } catch (error) {
    console.log("Sequelize Error", error);
  }
})();

// Khởi tạo model
const User = require("./User")(sequelize);
const Image = require("./Image")(sequelize);
const Comment = require("./Comment")(sequelize);
const ImageSave = require("./ImageSave")(sequelize);

// Định nghĩa relationship giữa các model

// User 1 - n Image
Image.belongsTo(User, { as: "user", foreignKey: "userId" });
User.hasMany(Image, { as: "images", foreignKey: "userId" });

// User 1 - n Comment
// Image 1 - n Comment
User.belongsToMany(Image, {
  as: "imageComments",
  through: { model: Comment, unique: false },
  foreignKey: "userId",
});
Image.belongsToMany(User, {
  as: "userComments",
  through: { model: Comment, unique: false },
  foreignKey: "imageId",
});

// User 1 - n ImageSave
// Image 1 - n ImageSave
User.belongsToMany(Image, {
  as: "imageSaves",
  through: ImageSave,
  foreignKey: "userId",
});
Image.belongsToMany(User, {
  as: "userSaves",
  through: ImageSave,
  foreignKey: "imageId",
});

module.exports = {
  sequelize,
  User,
  Image,
  Comment,
  ImageSave,
};
