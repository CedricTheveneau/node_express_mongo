const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  bank: { type: String, required: [true, "The bank field is required"] },
  name: {
    type: String,
    required: [true, "The name field is required"],
    maxlength: [50, "The account name must be at most 50 characters long"],
  },
  lastUpdated: { type: Date, required: [true, "The date is required"] },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "The user field is required"],
  },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
