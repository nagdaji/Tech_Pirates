const express = require("express");
const app = express();
const register = require("../Controllers/register");
const loggedin = require("../Controllers/loggedin");
const logout = require("../Controllers/logout");
const spendings = require("../Controllers/spendings");
// const editTransaction = require("../Controllers/editTransaction");
const router = express.Router();

router.get("/", loggedin, (req, res) => {
  if (req.user) {
    res.render("userhome", {
      username: req.user.fullname,
      email: req.user.email,
    });
  } else {
    res.clearCookie("userRegistered");
    res.render("index");
  }
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/features", (req, res) => {
  res.render("Features");
});

// -------------- dashboard ---------------
router.get("/spending", loggedin, (req, res) => {
  if (req.user) {
    res.render("spending", {
      username: req.user.fullname,
      email: req.user.email,
    });
  } else {
    res.render("index");
  }
});
router.get("/add_entry", loggedin, (req, res) => {
  if (req.user) {
    res.render("add_entry", {
      username: req.user.fullname,
      email: req.user.email,
    });
  } else {
    res.render("index");
  }
});

router.get("/updateTransaction", loggedin, (req, res) => {
  if (req.user) {
    res.render("spending", {
      username: req.user.fullname,
      email: req.user.email,
    });
  } else {
    res.render("index");
  }
});
// ----------------------------------

router.get("/editTransaction", loggedin, (req, res) => {
  if (req.user) {
    res.render("spending", {
      username: req.user.fullname,
      email: req.user.email,
    });
  } else {
    res.render("index");
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/logout", logout);

module.exports = router;
