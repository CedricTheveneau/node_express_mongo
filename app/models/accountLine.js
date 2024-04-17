const mongoose = require("mongoose");

const accountLineSchema = new mongoose.Schema({
  label: { type: String },
  action: { type: Enumerator },
  amount: { type: Number },
  date: { type: Date },
  method: { type: Enumerator },
  status: { type: Enumerator },
  category: { type: String },
  lastUpdate: { type: Date },
});

const AccountLine = mongoose.model(AccountLine, accountLineSchema);

module.exports = AccountLine;
