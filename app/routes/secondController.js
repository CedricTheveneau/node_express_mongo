const express = require("express");
const router = express();
const secondControllerCtrl = require("../controllers/secondController.js");

router.post("/signup", secondControllerCtrl.signup);
//...

module.exports = router;
