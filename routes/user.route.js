const express = require("express");
let router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.post("/", userController.addUser);
router.put("/", userController.updateUser);
router.delete("/", userController.deleteUser);

module.exports = router;
