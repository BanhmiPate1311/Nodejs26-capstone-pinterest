const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  return sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "user_id",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "email",
        validate: {
          isEmail: {
            msg: "invalid email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,

        // Sẽ được chạy trước khi create/update
        set(value) {
          // Không được lưu plaintext password trực tiếp xuống DB
          // Ta cần hash password bằng thư viện bcrypt
          const salt = bcrypt.genSaltSync();
          const hashedPassword = bcrypt.hashSync(value, salt);

          this.setDataValue("password", hashedPassword);
        },
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "full_name",
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "users",
      // disable createdAt, updatedAt
      timestamps: false,
      // Bỏ qua cái column password khi tìm kiếm các record
      defaultScope: {
        attributes: {
          exclude: ["password"],
        },
      },
      // Các phương thức được tự động chạy sau một hành động(create/update/delete)
      hooks: {
        // Xoá property password của record được trả ra sau khi create/update thành công
        afterSave: (record) => {
          delete record.dataValues.password;
        },
      },
    }
  );
};
