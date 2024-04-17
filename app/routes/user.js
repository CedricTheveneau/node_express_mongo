const express = require("express");
const router = express();
const user = require("../controllers/user.js");

router.get("/hello", user.hello);
//...

module.exports = router;
