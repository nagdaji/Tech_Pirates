const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const register = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const Npassword = req.body.password;
  const Cpassword = req.body.cnfpassword;
  const emailvalid = validator.isEmail(email);
  // console.log(Npassword + " " + Cpassword);
  if (!email || !Npassword || !emailvalid) {
    // console.log("Email is not valid");
    // sending res.kson to page
    return res.json({
      status: "error",
      message: "Please enter valid",
    });
  } else if (Npassword != Cpassword) {
    return res.json({
      status: "error",
      message: "Password did not Matched",
    });
  } else {
    // console.log(email);
    const sql = `SELECT email FROM userinfo WHERE email = '${email}'`;
    db.query(sql, async (err, results) => {
      if (err) throw err;

      const propertyValues = results.length;
      // console.log(propertyValues);

      if (propertyValues) {
        // res.send("alert(Email is already registered");
        // console.log("Email is already registered");
        return res.json({
          status: "error",
          message: "Email is already registered",
        });
      } else {
        const password = await bcrypt.hash(Npassword, 8);
        // console.log(password);
        const sql = "INSERT INTO userinfo SET ? ";

        db.query(
          sql,
          { fullname: name, email: email, password: password },
          (err, result) => {
            if (err) throw err;
            const search = `SELECT sno FROM userinfo WHERE email = '${email}'`;
            db.query(search, (err, result) => {
              if (err) throw err;
              const tablename = "transactionuser" + result[0].sno;
              // console.log(tablename);
              const createtable = `CREATE TABLE xledger.${tablename} (Tid DOUBLE NOT NULL AUTO_INCREMENT,date TEXT NOT NULL,currencyname text DEFAULT NULL,quantity text DEFAULT NULL , category TEXT NOT NULL , remark TEXT NOT NULL , mode TEXT NOT NULL , amount DOUBLE NOT NULL , isgroup TEXT NULL , groupmember INT NULL DEFAULT NULL ,  PRIMARY KEY (Tid));
              `;
              db.query(createtable, (err, result) => {
                if (err) throw err;
              });
            });
            return res.json({
              status: "success",
              message: "User has been Registered",
            });
          }
        );
      }
    });
  }
};
module.exports = register;
