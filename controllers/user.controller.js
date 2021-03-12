const db = require("../models");

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await db.User.destroy({ where: { id: id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    let user = await db.User.update(req.body, { where: { id: id } });
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  try {
    let user = await db.User.findByPk(id);
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getUsers = async (req, res) => {
  try {
    let users = await db.User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
};
