const db = require("../routes/db-config");
// const bcrypt = require("bcryptjs");
// const validator = require("validator");

const verifygroupuser = async (req, res) => {
  const mememail = req.body.mememail;
  const email = req.body.email;
  const code = req.body.code;
  // console.log(mememail);
  // console.log(email);
  // console.log(grpname);
  const sql = `SELECT email FROM userinfo WHERE email = '${mememail}'`;
  db.query(sql, async (err, results) => {
    if (err) throw err;
    if (results.length == 0) {
      return res.json({
        status: "success",
        message: `No User Found For this Email`,
      });
    }
    const sqll = `SELECT memberid FROM groupinfo WHERE memberid = '${mememail}' AND groupcode='${code}'`;
    db.query(sqll, (err, result1) => {
      if (err) throw err;
      if (result1.length != 0) {
        return res.json({
          status: "success",
          message: `User Already in this Group`,
        });
      }
    });
  });
};
module.exports = verifygroupuser;
