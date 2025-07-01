const express = require("express");
const { categoryController } = require("../controller");
const router = express.Router();
const addCategoryValidator = require("../validators/category");
const validate = require("../validators/validate");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");

router.post("/", isAuth, isAdmin , addCategoryValidator , validate , categoryController.addCategory)

module.exports = router;