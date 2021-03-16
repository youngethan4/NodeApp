const express = require("express");
let router = express.Router();

const makeController = require("../controllers/make.controller");

router.get("/", makeController.getMakes);
router.get("/:id", makeController.getMake);
router.put("/:id", makeController.updateMake);
router.post("/", makeController.addMake);
router.delete("/:id", makeController.deleteMake);

module.exports = router;
