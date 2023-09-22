// chi tiết route products
const express = require('express')
const router = express.Router();

const controllers = require('../../controllers/client/products.controllers.js');

router.get('/', controllers.index)  
   

module.exports = router;