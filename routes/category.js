const express = require("express");
const { categoryController } = require("../controller");
const router = express.Router();
const {addCategoryValidator, idValidator} = require("../validators/category");
const validate = require("../validators/validate");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");

router.post("/", isAuth, addCategoryValidator , validate , categoryController.addCategory);

router.put("/:id", isAuth, idValidator , validate , categoryController.updateCategory);

router.delete("/:id", isAuth, categoryController.deleteCategory);

router.get("/", isAuth, categoryController.getCategories);

router.get("/:id", isAuth, idValidator , validate , categoryController.getCategory);


module.exports = router;