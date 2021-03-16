const db = require("../models");

exports.addMake = async (req, res) => {
  const data = req.body;
  try {
    let make = await db.Make.create(data);
    res.json(make);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.updateMake = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    let make = await db.Make.update(data, { where: { id: id } });
    res.json(make);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.getMake = async (req, res) => {
  const id = req.params.id;
  try {
    let make = await db.Make.findByPk(id);
    res.json(make);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.getMakes = async (req, res) => {
  try {
    let makes = await db.Make.findAll();
    res.json(makes);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.deleteMake = async (req, res) => {
  const id = req.params.id;
  try {
    await db.Make.destroy({ where: { id: id } });
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
};
