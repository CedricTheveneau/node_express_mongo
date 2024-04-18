const express = require("express");
const router = express();
const auth = require("../middlewares/auth.js");
const accountCtrl = require("../controllers/account.js");

router.get("/", auth, accountCtrl.readAll);
router.post("/", auth, accountCtrl.create);
router.delete("/:id", auth, accountCtrl.delete);
router.put("/:id", auth, accountCtrl.update);

module.exports = router;
