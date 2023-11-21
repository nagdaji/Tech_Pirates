const db = require("../routes/db-config");
const dailyreport = async (req, res) => {
  const email = req.body.email;
  const date = req.body.searchdate;

  // console.log(date);
  const sql = `SELECT sno FROM userinfo WHERE email = '${email}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;

    const tablename = "transactionuser" + result[0].sno;
    const sqlsearch = `SELECT SUM(amount),category FROM ${tablename}
    WHERE date='${date}'
    group by category;`;
    db.query(sqlsearch, (err, results) => {
      if (err) throw err;
      return res.json({
        results,
      });
    });
  });
};
module.exports = dailyreport;
