const express = require("express");
const app = express();
const router = require("./app/routes/index.js");
const mongoose = require("mongoose");
app.use(express.json());

mongoose
  .connect(process.env.DB_URI, { ssl: true })
  .then(() => console.log("MongoDB connected !"))
  .catch(() => console.log("Erreur with MongoDB connection"));

//Ajout des routes
app.use("/api", router);

module.exports = app;
