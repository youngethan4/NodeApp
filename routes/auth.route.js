const passport = require("passport");
const express = require("express");
let router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);
router.post("/login", passport.authenticate("local"), authController.login);

module.exports = router;
