const express = require("express");
const { handleErrors } = require("./helpers/error");
const { sequelize } = require("./models");

const app = express();

app.use(express.json());
app.use(express.static("."));

// Sync cái model của sequelize với DB
sequelize.sync({ alter: true });

const v1 = require("./routers/v1");
app.use("/api/v1", v1);

// Middleware dùng để bắt và xử lý trả lỗi ra cho client
// Phải được đặt bên dưới các routers
app.use(handleErrors);

app.listen("4000");
