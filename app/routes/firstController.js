const express = require("express");
const router = express();
const firstController = require("../controllers/firstController.js");

router.post("/signup", firstController.signup);
//...

module.exports = router;
