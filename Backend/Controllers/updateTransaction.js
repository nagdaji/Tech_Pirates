const db = require("../routes/db-config");
// const bcrypt = require("bcryptjs");
// const validator = require("validator");

const updateTransaction = async (req, res) => {
  const date = req.body.date;
  const Category = req.body.Category;
  let amount = req.body.amount;
  const remarks = req.body.remarks;
  const isgroup = req.body.isgroup;
  const grpmem = req.body.grpmem;
  const paymode = req.body.paymode;
  const email = req.body.email;
  const Tid = req.body.Tid;
  if (isgroup == "YES") {
    var newamount = amount / grpmem;
    amount = newamount.toFixed(2);
  }
  //   if (isgroup == "NO") grpmem = 0;
  const sql = `SELECT * FROM userinfo WHERE email = '${email}'`;
  db.query(sql, async (err, results) => {
    if (err) throw err;
    const tablename = "transactionuser" + results[0].sno;

    const sqlupdate = `UPDATE ${tablename} SET date='${date}',category='${Category}',remark='${remarks}',mode='${paymode}',amount='${amount}',isgroup='${isgroup}',groupmember='${grpmem}' WHERE Tid='${Tid}'`;

    // `INSERT INTO ${tablename} (date, category, remark, mode, amount, isgroup, groupmember) VALUES ('${date}', '${Category}', '${remarks}', '${paymode}', '${amount}', '${isgroup}', '${grpmem}')`;
    // var values = [date, Category, remarks, paymode, amount, isgroup, grpmem];
    // console.log(tablename);
    db.query(sqlupdate, (err, result) => {
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
module.exports = updateTransaction;
