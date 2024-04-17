const express = require("express");
const router = express();
const category = require("../controllers/category.js");

router.get("/hello", category.hello);
//...

module.exports = router;
