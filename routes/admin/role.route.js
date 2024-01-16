const express = require('express')
const router = express.Router();
const controllers = require('../../controllers/admin/role.controllers.js');

router.get('/', controllers.index);

router.get('/create', controllers.create);

router.post('/create', controllers.createPost);

router.get('/edit/:id', controllers.edit);

router.patch('/edit/:id', controllers.editPatch);

router.get('/permissions', controllers.permissions);

router.patch("/permissions", controllers.permissionsPatch);

router.get("/detail/:id", controllers.detail);

module.exports = router;