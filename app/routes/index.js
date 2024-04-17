// Call of the required modules
const express = require("express");
const router = express();
const userRoutes = require("./user.js");
const categoryRoutes = require("./category.js");
const accountRoutes = require("./account.js");
const accountLineRoutes = require("./accountLine.js");

// User routes
router.use("/user", userRoutes);

// category routes
router.use("/category", categoryRoutes);

// account routes
router.use("/account", accountRoutes);

// accountLine routes
router.use("/accountLine", accountLineRoutes);

module.exports = router;
