// chi tiết route products
const express = require('express')
const router = express.Router();

const controllers = require('../../controllers/client/products.controllers.js');

router.get('/', controllers.index)  

router.get('/add', controllers.add) 

router.get('/edit', controllers.edit) 

router.get('/delete', controllers.delete)      

module.exports = router;