const express = require("express");
const router = express.Router();
const register = require("./register");
const login = require("./login");
const add_entry = require("./add_entry");
const spendings = require("./spendings");
const deleteTransaction = require("./deleteTransaction");
const updateTransaction = require("./updateTransaction");
const crypto = require("./crypto");
const yearlycategory = require("./yearlycategory");

router.post("/register", register);
router.post("/login", login);
router.post("/add_entry", add_entry);
router.post("/spending", spendings);
router.post("/dailyreport", dailyreport);
router.post("/weeklyreport", weeklyreport);
router.post("/weeklyreport2", weeklyreport2);
router.post("/monthlyreportdate", monthlyreportdate);
router.post("/monthlyreportcategory", monthlyreportcategory);
router.post("/yearlydate", yearlydate);
router.post("/yearlycategory", yearlycategory);
router.post("/deleteTransaction/", deleteTransaction);
router.post("/updateTransaction/", updateTransaction);
router.post("/crypto", crypto);

module.exports = router;
