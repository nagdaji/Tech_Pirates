const db = require("../routes/db-config");

const crypto = async (req, res) => {
  const date = req.body.date;
  const Category = req.body.Category;
  let amount = req.body.amount;
  const remarks = req.body.remarks;
  const cryptoname = req.body.cryptoname;
  const quantity = req.body.quantity;
  const paymode = req.body.paymode;
  const email = req.body.email;

  //   console.log(email);
  const sql = `SELECT * FROM userinfo WHERE email = '${email}'`;
  db.query(sql, async (err, results) => {
    if (err) throw err;
    const tablename = "transactionuser" + results[0].sno;
    const sqlinsert = `INSERT INTO ${tablename} (date,currencyname,quantity, category, remark, mode, amount) VALUES ('${date}','${cryptoname}','${quantity}', '${Category}', '${remarks}', '${paymode}', '${amount}')`;
    // console.log(tablename);
    db.query(sqlinsert, (err, result) => {
      if (err) throw err;
    });
    return res.json({
      status: "success",
      message: `Data Saved Successfully `,
    });
  });
};
module.exports = crypto;
