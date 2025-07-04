const express = require("express");
const { fileController } = require("../controller");
const isAuth = require("../middlewares/isAuth");
const upload = require("../middlewares/upload");
const router = express.Router();

router.post("/upload", isAuth , upload.single("image") , fileController.uploadFile);

router.get("/signed-url" , isAuth, fileController.getSignedUrl)

router.delete("/delete-file", isAuth, fileController.deleteFile)

module.exports = router;