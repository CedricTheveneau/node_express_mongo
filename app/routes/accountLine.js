const express = require("express");
const router = express();
const accountLine = require("../controllers/accountLine.js");

router.get("/hello", accountLine.hello);
//...

module.exports = router;
