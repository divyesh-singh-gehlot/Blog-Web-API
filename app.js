const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan")
dotenv.config();
const connectDb = require("./init/mongoDb");
const { authRoute } = require("./routes");
const {errorHandler} = require("./middlewares")

//init app
const app = express();

//Connect DB
connectDb();

//Third-party Middlewares
app.use(express.json({limit:"500mb"}));
app.use(bodyParser.urlencoded({limit:"500mb", extended:true}));
app.use(morgan("dev"));

//Routes
app.use("/api/v1/auth", authRoute)

//Error Handling Middleware
app.use(errorHandler);

module.exports = app;