const express = require("express");
const { fileController } = require("../controller");
const isAuth = require("../middlewares/isAuth");
const upload = require("../middlewares/upload");
const router = express.Router();

router.post("/upload", isAuth , upload.single("image") , fileController.uploadFile)

module.exports = router;