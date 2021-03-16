const db = require("../models");

exports.addCar = async (req, res) => {
  const data = req.body;
  try {
    let car = await db.Car.create(data);
    res.json(car);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.updateCar = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    let car = await db.Car.update(data, { where: { id: id } });
    res.json(car);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.getCar = async (req, res) => {
  const id = req.params.id;
  try {
    let car = await db.Car.findByPk(id);
    res.json(car);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.getCars = async (req, res) => {
  try {
    let cars = await db.Car.findAll();
    res.json(cars);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.deleteCar = async (req, res) => {
  const id = req.params.id;
  try {
    await db.Car.destroy({ where: { id: id } });
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
};
