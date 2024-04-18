const express = require("express");
const router = express();
const user = require("../controllers/user.js");

router.post("/signup", user.signup);
router.post("/login", user.login);

module.exports = router;
