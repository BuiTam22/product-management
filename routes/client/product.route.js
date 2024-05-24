const express = require('express')
const router = express.Router();
const controllers = require('../../controllers/client/products.controllers.js');
const saveToCookiesMiddleware = require("../../middlewares/client/saveToCookies.middleware.js");


router.get('/', controllers.index)  

router.get('/detail/:slugProduct', saveToCookiesMiddleware.saveToCookies, controllers.detail)  

router.get('/:slugCategory', controllers.category); 


module.exports = router;