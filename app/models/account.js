const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  bank: { type: String },
  name: { type: String },
  lastUpdated: { type: Date },
  user: { type: String },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
