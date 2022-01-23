const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors =  require("cors")
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config("../");
require("./src/config/db");

const routers = require("./src/routers");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: '*'
}))
app.use(express.static(path.join(__dirname, "src", "public")));

app.use("/api/v1", routers);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500).send({
    status: false,
    message: err.message,
  });
});

module.exports = app;
