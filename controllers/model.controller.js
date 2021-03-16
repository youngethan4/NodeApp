const db = require("../models");

exports.addModel = async (req, res) => {
  const data = req.body;
  try {
    let model = await db.CarModel.create(data);
    res.json(model);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.updateModel = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    let model = await db.CarModel.update(data, { where: { id: id } });
    res.json(model);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.getModel = async (req, res) => {
  const id = req.params.id;
  try {
    let model = await db.CarModel.findByPk(id);
    res.json(model);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.getModels = async (req, res) => {
  try {
    let models = await db.CarModel.findAll();
    res.json(models);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.deleteModel = async (req, res) => {
  const id = req.params.id;
  try {
    await db.CarModel.destroy({ where: { id: id } });
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
};
