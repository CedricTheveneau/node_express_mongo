const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  bank: {
    type: String,
    required: [true, "The bank field is required"],
    trim: true,
  },
  name: {
    type: String,
    required: [true, "The name field is required"],
    trim: true,
    maxlength: [50, "The account name must be at most 50 characters long"],
  },
  lastUpdated: { type: Date },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "The user field is required"],
  },
});

accountSchema.pre("save", function (next) {
  this.lastUpdated = Date.now();
  next();
});

accountSchema.pre("findOneAndUpdate", function (next) {
  this.set({ lastUpdated: Date.now() });
  next();
});

accountSchema.pre("findOneAndDelete", async function (next) {
  try {
    const accountId = this.getQuery().id;
    await mongoose.model("AccountLine").deleteMany({
      accountId: accountId,
    });
    next();
  } catch (error) {
    next(error);
  }
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
