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
    if (car[0] == 0) res.sendStatus(404);
    else res.json(car);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.getCar = async (req, res) => {
  const id = req.params.id;
  try {
    let car = await db.Car.findByPk(id);
    if (car == null) res.sendStatus(404);
    else res.json(car);
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
    let car = await db.Car.destroy({ where: { id: id } });
    if (car == 0) res.sendStatus(404);
    else res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
};
