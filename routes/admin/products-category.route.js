const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/admin/products-category.controllers.js');
const multer  = require('multer');
const validate = require('../../validates/admin/product.validate.js');

const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get('/', controllers.index);

router.get('/create', controllers.create);  

router.post(
    '/create',
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controllers.createPost);  

router.get('/edit/:id', controllers.edit);  

router.patch(
    '/edit/:id',
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controllers.editPatch);  
module.exports = router;