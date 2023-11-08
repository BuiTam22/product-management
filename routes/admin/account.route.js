const express = require('express')
const router = express.Router();
const multer  = require('multer');
const controllers = require('../../controllers/admin/account.controllers.js');
const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware');

const upload = multer();

router.get('/', controllers.index);

router.get('/create', controllers.create);

router.post(
    '/create',
    // để là avatar vì ở file pug có name phần file ảnh là avatar
    upload.single("avatar"),
    uploadCloud.upload,
    controllers.createPost);

router.get('/edit/:id', controllers.edit);


router.patch(
    '/edit/:id',
    upload.single("avatar"),
    uploadCloud.upload,
    controllers.editPatch);
module.exports = router;