const Account = require("../models/account");

exports.readAll = async (req, res) => {
  try {
    let accounts = await Account.find({
      userId: req.auth.userId,
    });
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Something wrong happened with your request to retrieve your accounts.",
    });
  }
};
exports.create = async (req, res) => {
  try {
    const { bank, name } = req.body;
    const account = new Account({
      bank: bank,
      name: name,
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
exports.delete = async (req, res) => {
  try {
    const account = await Account.findOneAndDelete({
      id: req.params.id,
      userId: req.auth.userId,
    });
    if (!account) {
      res.status(404).json({
        message: "Didn't find the account you were looking for.",
      });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Something wrong happened with your request to delete your account.",
    });
  }
};
exports.update = async (req, res) => {
  try {
    const { bank, name } = req.body;
    const account = await Account.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.auth.userId,
      },
      { bank, name },
      { returnDocument: "after" }
    );
    if (!account) {
      return res.status(404).json({
        message: "Didn't find the account you were looking for.",
      });
    }
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Something wrong happened with your request to update your account.",
    });
  }
};
