const AccountLine = require("../models/accountLine");

exports.readByAccount = async (req, res) => {
  try {
    let lines = await AccountLine.find({
      // userId: req.auth.userId,
      accountId: req.params.accountId,
    });
    res.status(200).json(lines);
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Something wrong happened with your request to retrieve your lines.",
    });
  }
};
exports.create = async (req, res) => {
  try {
    const { label, action, amount, date, method, categoryId } = req.body;
    const accountLine = new AccountLine({
      label,
      action,
      amount,
      date,
      method,
      categoryId,
      accountId: req.params.accountId,
    });
    await accountLine.save();
    res.status(201).json(accountLine);
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Something wrong happened with your request to create a new account line.",
    });
  }
};
exports.delete = async (req, res) => {
  try {
    const accountLines = await AccountLine.findOneAndDelete({
      _id: req.params.id,
    });
    if (!accountLines) {
      res.status(404).json({
        message: "Didn't find the account line you were looking for.",
      });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Something wrong happened with your request to delete your account line.",
    });
  }
};
exports.update = async (req, res) => {
  try {
    const { label, action, amount, date, method, categoryId } = req.body;
    const accountLine = await AccountLine.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        label,
        action,
        amount,
        date,
        method,
        categoryId,
      },
      { returnDocument: "after" }
    );
    if (!accountLine) {
      return res.status(404).json({
        message: "Didn't find the account line you were looking for.",
      });
    }
    res.status(200).json(accountLine);
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Something wrong happened with your request to update your account line.",
    });
  }
};
