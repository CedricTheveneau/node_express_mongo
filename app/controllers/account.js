const Account = require("../models/account");
const jwt = require("jsonwebtoken");

exports.readAll = (req, res) => {
  res.send("You're on AccountLine fetch");
};
exports.create = async (req, res) => {
  try {
    const { bank, name } = req.body;
    const account = new Account({
      bank: bank,
      name: name,
      lastUpdated: Date.now(),
      userId: req.auth.userId,
    });
    await account.save();
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Something wrong happened with your request to create a new account.",
    });
  }
};
exports.delete = (req, res) => {
  res.send("You're on AccountLine delete");
};
exports.update = (req, res) => {
  res.send("You're on AccountLine update");
};
