const db = require("../routes/db-config");
const jwt = require("jsonwebtoken");
const loggedin = (req, res, next) => {
  if (!req.cookies.userRegistered) return next();
  try {
    const decoded = jwt.verify(
      req.cookies.userRegistered,
      process.env.JWT_SECRET
    );
    const sql = `SELECT * FROM userinfo WHERE sno = ${decoded.sno}`;
    db.query(sql, (err, result) => {
      if (err) return next();
      req.user = result[0];
      return next();
    });
  } catch (err) {
    if (err) return next();
  }
};

module.exports = loggedin;
