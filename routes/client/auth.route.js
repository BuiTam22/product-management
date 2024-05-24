const express = require('express')
const router = express.Router();
const controllers = require('../../controllers/client/auth.controllers.js');

router.get('/login/:status', controllers.login);

router.post("/login", controllers.loginPost);

router.get("/logout", controllers.logOut);

router.post("/login-url/", controllers.loginPostUrl);




module.exports = router;