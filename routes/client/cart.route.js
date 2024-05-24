const express = require("express")
const router = express.Router();
const controllers = require("../../controllers/client/cart.controllers.js");

router.post("/add/:idProduct", controllers.add);

module.exports = router;