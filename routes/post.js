const express = require("express");
const isAuth = require("../middlewares/isAuth");
const { postController } = require("../controller");
const { addPostValidator, updatePostValidator, idValidator } = require("../validators/post");
const validate = require("../validators/validate");
const router = express.Router();

router.get("/top-contributors", isAuth , postController.getTopContributors);

router.get("/" , isAuth , postController.getPosts);
router.post("/" , isAuth , addPostValidator , validate , postController.addPost);

router.get("/:id" , isAuth , postController.getPost);
router.put("/:id" , isAuth , updatePostValidator , idValidator , validate , postController.updatePost);
router.delete("/:id" , isAuth , idValidator , validate , postController.deletePost);



module.exports = router;