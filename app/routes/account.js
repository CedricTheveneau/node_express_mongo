const express = require("express");
const router = express();
const account = require("../controllers/account.js");

router.get("/hello", account.hello);
//...

module.exports = router;
