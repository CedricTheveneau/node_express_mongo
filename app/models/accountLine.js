const mongoose = require("mongoose");

const accountLineSchema = new mongoose.Schema({
  label: { type: String },
  action: { type: String },
  amount: { type: Number },
  date: { type: Date },
  method: { type: String },
  status: { type: Boolean },
  category: { type: String },
  lastUpdate: { type: Date },
});

const AccountLine = mongoose.model("AccountLine", accountLineSchema);

module.exports = AccountLine;
