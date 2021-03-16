const express = require("express");
let router = express.Router();

const carController = require("../controllers/car.controller");

router.get("/", carController.getCars);
router.get("/:id", carController.getCar);
router.put("/:id", carController.updateCar);
router.post("/", carController.addCar);
router.delete("/:id", carController.deleteCar);

module.exports = router;
