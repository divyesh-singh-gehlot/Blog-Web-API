const express = require("express");
const isAuth = require("../middlewares/isAuth");
const { postController } = require("../controller");
const {
  addPostValidator,
  updatePostValidator,
  idValidator
} = require("../validators/post");
const validate = require("../validators/validate");
const asyncHandler = require("../utils/asyncHandler"); // 👈 Async error handler

const router = express.Router();

// @route   GET /api/v1/posts/top-contributors
// @desc    Get top contributors
router.get(
  "/top-contributors",
  isAuth,
  asyncHandler(postController.getTopContributors)
);

// @route   GET /api/v1/posts
// @desc    Get all posts
router.get(
  "/",
  isAuth,
  asyncHandler(postController.getPosts)
);

// @route   POST /api/v1/posts
// @desc    Add a new post
router.post(
  "/",
  isAuth,
  addPostValidator,
  validate,
  asyncHandler(postController.addPost)
);

// @route   GET /api/v1/posts/:id
// @desc    Get a single post by ID
router.get(
  "/:id",
  isAuth,
  asyncHandler(postController.getPost)
);

// @route   PUT /api/v1/posts/:id
// @desc    Update a post by ID
router.put(
  "/:id",
  isAuth,
  updatePostValidator,
  idValidator,
  validate,
  asyncHandler(postController.updatePost)
);

// @route   DELETE /api/v1/posts/:id
// @desc    Delete a post by ID
router.delete(
  "/:id",
  isAuth,
  idValidator,
  validate,
  asyncHandler(postController.deletePost)
);

module.exports = router;
