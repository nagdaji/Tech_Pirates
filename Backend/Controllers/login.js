const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require("bcrypt");
const validator = require("validator");
// const { response } = require("express");

const login = async (req, res) => {
  const email = req.body.email;
  const Npassword = req.body.password;
  const emailvalid = validator.isEmail(email);

  if (!email || !Npassword || !emailvalid) {
    // console.log("Email is not valid");
    return res.json({
      status: "error",
      message: "Please Enter valid Email",
    });
  } else {
    const sql = `SELECT * FROM userinfo WHERE email = '${email}'`;
    db.query(sql, async (Err, results) => {
      if (Err) throw Err;

      const propertyValues = results.length;
      // const password = await bcrypt.hash(Npassword, 8);
      // console.log(results[0].password);
      if (!propertyValues) {
        return res.json({
          status: "error",
          message: "No user Found ! Please Register first",
        });
      } else if (!(await bcrypt.compare(Npassword, results[0].password))) {
        return res.json({
          status: "error",
          message: "Incorrect Password ! Try Again",
        });
      } else {
        // console.log(results[0].sno);
        const token = jwt.sign(
          { sno: results[0].sno },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRES,
            // httponly: true,
          }
        );

        const cookieOptions = {
          expiresIn: new Date(
            Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
        };
        res.cookie("userRegistered", token, cookieOptions);
        return res.json({
          status: "success",
          message: "User has been logged in ",
        });
      }
    });
  }
};
module.exports = login;
