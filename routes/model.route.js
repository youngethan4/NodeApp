const express = require("express");
let router = express.Router();

const modelController = require("../controllers/model.controller");

router.get("/", modelController.getModels);
router.get("/:id", modelController.getModel);
router.put("/:id", modelController.updateModel);
router.post("/", modelController.addModel);
router.delete("/:id", modelController.deleteModel);

module.exports = router;
