const express = require("express");
const router = express.Router();
const {authController} = require("../controller");
const { signupValidator } = require("../validators/auth");

router.post("/signup", signupValidator ,authController.signup)

module.exports = router;