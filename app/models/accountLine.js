const mongoose = require("mongoose");

const accountLineSchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, "The label field is required"],
    maxlength: [50, "The label must be at most 50 characters long"],
    minlength: [2, "The category name must be at least 2 characters long"],
    trim: true,
  },
  action: {
    type: String,
    required: [true, "The action field is required"],
    enum: {
      value: ["Crédit", "Débit"],
      message: "{VALUE} is not an available option",
    },
  },
  amount: {
    type: Number,
    required: [true, "The amount field is required"],
    validate: {
      validator: function (amount) {
        return amount > 0;
      },
      message: "Amount must be more than 0",
    },
  },
  date: { type: Date, required: [true, "The date field is required"] },
  method: {
    type: String,
    required: [true, "The method field is required"],
    enum: {
      value: ["Cash", "Direct Deposit", "Credit Card", "Bank Transfer"],
      message: "{VALUE} is not an available option",
    },
  },
  status: { type: Boolean, default: false },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "The category field is required"],
  },
  lastUpdated: { type: Date, required: [true, "The date field is required"] },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: [true, "The account field is required"],
  },
});

const AccountLine = mongoose.model("AccountLine", accountLineSchema);

module.exports = AccountLine;
