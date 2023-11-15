const db = require("../routes/db-config");
// const bcrypt = require("bcryptjs");
// const validator = require("validator");

const add_entry = async (req, res) => {
  const date = req.body.date;
  const Category = req.body.Category;
  let amount = req.body.amount;
  const remarks = req.body.remarks;
  const isgroup = req.body.isgroup;
  const grpmem = req.body.grpmem;
  const paymode = req.body.paymode;
  const email = req.body.email;

  if (isgroup == "YES") {
    var newamount = amount / grpmem;
    amount = newamount.toFixed(2);
  }

  const sql = `SELECT * FROM userinfo WHERE email = '${email}'`;
  db.query(sql, async (err, results) => {
    if (err) throw err;
    const tablename = "transactionuser" + results[0].sno;
    const sqlinsert = `INSERT INTO ${tablename} (date, category, remark, mode, amount, isgroup, groupmember) VALUES ('${date}', '${Category}', '${remarks}', '${paymode}', '${amount}', '${isgroup}', '${grpmem}')`;
    db.query(sqlinsert, (err, result) => {
      if (err) throw err;
    });
    if (isgroup == "YES") {
      return res.json({
        status: "success",
        message: `Data Saved Successfully , YOUR SHARE IN CONTRIBUTION IS ${amount} Rupees`,
      });
    }
    return res.json({
      status: "success",
      message: `Data Saved Successfully `,
    });
  });
};
module.exports = add_entry;
