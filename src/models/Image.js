const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Image",
    {
      imageId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "image_id",
      },
      imageName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "image_name",
      },
      path: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
      },
    },
    {
      tableName: "images",
      // disable createdAt, updatedAt
      timestamps: false,
    }
  );
};
