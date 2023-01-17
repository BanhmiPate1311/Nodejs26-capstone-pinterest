const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "ImageSave",
    {
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
      },
      imageId: {
        type: DataTypes.INTEGER,
        field: "image_id",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: "image_saves",
      // disable createdAt, updatedAt
      timestamps: false,
    }
  );
};
