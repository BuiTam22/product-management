const express = require('express')
const router = express.Router();
const controllers = require('../../controllers/admin/products.controllers.js');

router.get('/', controllers.index)  

//-bắt buộc người dùng phải gửi lên bằng phương thức patch, nếu để get thì người dùng có thể dùng url
// cập nhật linh tinh (vì mặc định trình duyệt dùng phương thức GET)
router.patch("/change-status/:status/:id", controllers.changeStatus);


router.patch("/change-multi", controllers.changeMulti);

router.patch("/delete/:id", controllers.deleteItem);

router.get("/create", controllers.create);

router.post("/create", controllers.createPost);

module.exports = router;