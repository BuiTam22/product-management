const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/my-account.controllers");
const multer  = require('multer');
const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware');

const upload = multer();
router.get("/", controllers.index);

router.get("/edit", controllers.edit);

router.patch(
    '/edit',
    upload.single("avatar"),
    uploadCloud.upload,
    controllers.editPatch);
module.exports = router;