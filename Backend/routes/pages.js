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
router.get("/group", loggedin, (req, res) => {
  if (req.user) {
    res.render("group", {
      username: req.user.fullname,
      email: req.user.email,
      groupadmin: req.user.fullname,
    });
  } else {
    res.render("index");
  }
});
router.get("/crypto", loggedin, (req, res) => {
  if (req.user) {
    res.render("crypto", {
      username: req.user.fullname,
      email: req.user.email,
    });
  } else {
    res.render("index");
  }
});

router.get("/stocks", loggedin, (req, res) => {
  if (req.user) {
    res.render("stocks", {
      username: req.user.fullname,
      email: req.user.email,
    });
  } else {
    res.render("index");
  }
});
router.get("/jwellery", loggedin, (req, res) => {
  if (req.user) {
    res.render("jwellery", {
      username: req.user.fullname,
      email: req.user.email,
    });
  } else {
    res.render("index");
  }
});
router.get("/exchange", loggedin, (req, res) => {
  if (req.user) {
    res.render("exchange", {
      username: req.user.fullname,
      email: req.user.email,
    });
  } else {
    res.render("index");
  }
});
router.get("/report", loggedin, (req, res) => {
  if (req.user) {
    res.render("report", {
      username: req.user.fullname,
      email: req.user.email,
    });
  } else {
    res.render("index");
  }
});
router.get("/reminder", loggedin, (req, res) => {
  if (req.user) {
    res.render("reminder", {
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
