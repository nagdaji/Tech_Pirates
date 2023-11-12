const express = require("express");
const router = express.Router();
const register = require("./register");
const login = require("./login");
const add_entry = require("./add_entry");
const spendings = require("./spendings");

router.post("/register", register);
router.post("/login", login);
router.post("/add_entry", add_entry);
router.post("/spending", spendings);

module.exports = router;
