const express = require("express");
const router = express();
const auth = require("../middlewares/auth.js");
const account = require("../controllers/account.js");

router.get("/", auth, account.fetch);
router.post("/", auth, account.new);
router.delete("/:id", auth, account.delete);
router.put("/:id", auth, account.update);

module.exports = router;
