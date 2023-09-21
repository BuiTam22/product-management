// chi tiết route products
const express = require('express')
const router = express.Router();

const controllers = require('../../controllers/client/products.controllers.js');

router.get('/', controllers.index)  

router.get('/add', controllers.add) 
   

module.exports = router;