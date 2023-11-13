const db = require("../routes/db-config");

const deleteTransaction = async (req, res) => {
  const email = req.body.email;
  const Tid = req.body.Tid;
  console.log(email);
  console.log(Tid);
  //   const tablename = "transactionuser"+;
  const sql = `SELECT sno FROM userinfo WHERE email = '${email}'`;
  db.query(sql, async (err, results) => {
    if (err) throw err;
    const tablename = "transactionuser" + results[0].sno;
    const sqldelete = `DELETE FROM ${tablename} WHERE Tid = '${Tid}'`;
    // console.log(tablename);
    db.query(sqldelete, (err, result) => {
      if (err) throw err;
    });
    return res.json({
      status: "success",
      message: `Data Deleted Successfully `,
    });
  });
};
module.exports = deleteTransaction;
