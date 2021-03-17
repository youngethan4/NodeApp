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
    if (make[0] == 0) res.sendStatus(404);
    else res.json(make);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.getMake = async (req, res) => {
  const id = req.params.id;
  try {
    let make = await db.Make.findByPk(id);
    if (make == null) res.sendStatus(404);
    else res.json(make);
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
    let make = await db.Make.destroy({ where: { id: id } });
    if (make == 0) res.sendStatus(404);
    else res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
};
