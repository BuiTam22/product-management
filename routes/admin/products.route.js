const express = require('express');
const multer  = require('multer');
const router = express.Router();
const controllers = require('../../controllers/admin/products.controllers.js');
const validate = require('../../validates/admin/product.validate.js');
const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware');

const upload = multer();

router.get('/', controllers.index)  

//-bắt buộc người dùng phải gửi lên bằng phương thức patch, nếu để get thì người dùng có thể dùng url
// cập nhật linh tinh (vì mặc định trình duyệt dùng phương thức GET)
router.patch("/change-status/:status/:id", controllers.changeStatus);

router.patch("/change-multi", controllers.changeMulti);

router.patch("/delete/:id", controllers.deleteItem);

router.get("/create", controllers.create);

router.post(
    "/create",
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controllers.createPost
  );

router.get('/edit/:id', controllers.edit);

router.patch(
    "/edit/:id",
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controllers.editPatch
  );

  router.get('/detail/:id', controllers.detail);
module.exports = router;