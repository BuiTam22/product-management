const express = require('express')
const router = express.Router();
const controllers = require('../../controllers/admin/dashboard.controllers.js');

router.use('/', controllers.dashboard)  

module.exports = router;