const express = require("express");
const router = express();
const auth = require("../middlewares/auth.js");
const accountLine = require("../controllers/accountLine.js");

router.get("/", auth, accountLine.fetch);
router.post("/", auth, accountLine.new);
router.delete("/:id", auth, accountLine.delete);
router.put("/:id", auth, accountLine.update);

module.exports = router;
