const db = require("../models/index.js");

exports.login = (req, res) => {
  res.json({ username: req.user.username, id: req.user.id });
};

exports.register = async (req, res) => {
  const data = req.body;
  try {
    let user = await db.User.create(data);
    res.json(user);
  } catch (err) {
    res.sendStatus(500);
  }
};
