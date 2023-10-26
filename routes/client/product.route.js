const express = require('express')
const router = express.Router();
const controllers = require('../../controllers/client/products.controllers.js');

router.get('/', controllers.index)  

router.get('/detail/:slug', controllers.detail)  


module.exports = router;