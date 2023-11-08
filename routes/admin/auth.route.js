const express = require('express')
const router = express.Router();
const controllers = require('../../controllers/admin/auth.controllers.js');

router.get('/login', controllers.login);

router.post('/login', controllers.loginPost);


module.exports = router;