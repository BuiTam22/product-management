const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/post.controllers.js");
const multer  = require('multer');
const validate = require('../../validates/admin/product.validate.js');

const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
router.get("/", controllers.index);

router.get("/create", controllers.create);

router.post(
    "/create",
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controllers.createPost);

module.exports = router;