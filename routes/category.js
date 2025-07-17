const express = require("express");
const { categoryController } = require("../controller");
const {
  addCategoryValidator,
  idValidator
} = require("../validators/category");
const validate = require("../validators/validate");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const asyncHandler = require("../utils/asyncHandler"); // 👈 Handles async errors

const router = express.Router();

// @route   POST /api/v1/categories
// @desc    Add a new category
router.post(
  "/",
  isAuth,
  addCategoryValidator,
  validate,
  asyncHandler(categoryController.addCategory)
);

// @route   PUT /api/v1/categories/:id
// @desc    Update a category by ID
router.put(
  "/:id",
  isAuth,
  idValidator,
  validate,
  asyncHandler(categoryController.updateCategory)
);

// @route   DELETE /api/v1/categories/:id
// @desc    Delete a category by ID
router.delete(
  "/:id",
  isAuth,
  idValidator,
  validate,
  asyncHandler(categoryController.deleteCategory)
);

// @route   GET /api/v1/categories
// @desc    Get all categories
router.get(
  "/",
  isAuth,
  asyncHandler(categoryController.getCategories)
);

// @route   GET /api/v1/categories/:id
// @desc    Get a category by ID
router.get(
  "/:id",
  isAuth,
  idValidator,
  validate,
  asyncHandler(categoryController.getCategory)
);

module.exports = router;
