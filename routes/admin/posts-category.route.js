const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/admin/posts-category.controllers.js');

router.get('/', controllers.index);


module.exports = router;