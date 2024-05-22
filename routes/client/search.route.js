const express = require('express')
const router = express.Router();
const controllers = require('../../controllers/client/search.controllers.js');

router.get('/:type', controllers.index)  


module.exports = router;