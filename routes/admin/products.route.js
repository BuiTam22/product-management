const express = require('express')
const router = express.Router();
const controllers = require('../../controllers/admin/products.controllers.js');

router.use('/', controllers.products)  

module.exports = router;