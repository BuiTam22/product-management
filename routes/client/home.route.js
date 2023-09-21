// chi tiết route home
const express = require('express')
const router = express.Router();
const controllers = require('../../controllers/client/home.controllers.js');

router.get('/', controllers.index)  

module.exports = router;