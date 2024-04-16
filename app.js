const express = require("express");
const app = express();
const router = require("./app/routes/index.js");
app.use(express.json());

//Ajout des routes
app.use("/api", router);

module.exports = app;
