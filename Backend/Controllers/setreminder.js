const db = require("../routes/db-config");
// const bcrypt = require("bcryptjs");
// const validator = require("validator");

const setreminder = async (req, res) => {
  const date = req.body.date;
  const Category = req.body.Category;
  const remarks = req.body.remarks;
  let amount = req.body.amount;
  const email = req.body.email;

  const sql = `SELECT * FROM userinfo WHERE email = '${email}'`;
  db.query(sql, async (err, results) => {
    if (err) throw err;
    const sno = results[0].sno;
    const sqlinsert = `INSERT INTO reminder (sno, datetime, category, remarks, amount) VALUES ('${sno}', '${date}', '${Category}', '${remarks}', '${amount}')`;
    db.query(sqlinsert, (err, result) => {
      if (err) throw err;
    });

    return res.json({
      status: "success",
      message: `Reminder Added Successfully!`,
    });
  });
};
module.exports = setreminder;
