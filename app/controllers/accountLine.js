const AccountLine = require("../models/accountLine");
const Account = require("../models/account");
const mongoose = require("mongoose");

const getLines = async (match, userId) => {
  const lines = await AccountLine.aggregate([
    {
      $match: match,
    },
    {
      $lookup: {
        from: "accounts",
        localField: "accountId",
        foreignField: "_id",
        as: "accountInfo",
      },
    },
    {
      $unwind: "$accountInfo",
    },
    {
      $match: {
        "accountInfo.userId":
          mongoose.Types.ObjectId.createFromHexString(userId),
      },
    },
    {
      $project: {
        accountInfo: 0,
      },
    },
  ]);
  if (!lines || lines.length === 0) {
    return false;
  }
  return lines;
};

exports.readByAccount = async (req, res) => {
  try {
    const lines = await getLines(
      {
        accountId: mongoose.Types.ObjectId.createFromHexString(
          req.params.accountId
        ),
      },
      req.auth.userId
    );
    if (!lines) {
      return res.status(404).json({
        message: "Didn't find the account line you were looking for.",
      });
    }
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
    const account = Account.findOne({
      _id: req.params.accountId,
      userId: req.auth.userId,
    });
    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }
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
    const accountLines = await getLines(
      {
        _id: mongoose.Types.ObjectId.createFromHexString(req.params.id),
      },
      req.auth.userId
    );
    if (!accountLines) {
      return res.status(404).json({
        message: "Didn't find the account line you were looking for.",
      });
    }
    await AccountLine.findOneAndDelete({
      _id: req.params.id,
    });
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
    const accountLines = await getLines(
      {
        _id: mongoose.Types.ObjectId.createFromHexString(req.params.id),
      },
      req.auth.userId
    );
    if (!accountLines) {
      return res.status(404).json({
        message: "Didn't find the account line you were looking for.",
      });
    }
    const { label, action, amount, date, method, categoryId } = req.body;
    await AccountLine.findOneAndUpdate(
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
    res.status(200).json(accountLines);
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Something wrong happened with your request to update your account line.",
    });
  }
};
