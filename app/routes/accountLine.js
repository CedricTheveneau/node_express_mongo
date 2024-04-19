const express = require("express");
const router = express();
const auth = require("../middlewares/auth.js");
const accountLineCtrl = require("../controllers/accountLine.js");

router.get("/:accountId", auth, accountLineCtrl.readByAccount);
router.post("/:accountId", auth, accountLineCtrl.create);
router.delete("/:id", auth, accountLineCtrl.delete);
router.put("/:id", auth, accountLineCtrl.update);

module.exports = router;
