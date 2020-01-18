const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoutes = require("./api/routes/auth");
const orderRoutes = require("./api/routes/orders");
const productRoutes = require("./api/routes/products");

const errorHandler = require("./helpers/errorsHandler");

mongoose.connect(process.env.MONGO_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/products", productRoutes);

app.use(errorHandler);

module.exports = app;
