const db = require("../routes/db-config");
const showexpences = async (req, res) => {
  const email = req.body.email;

  const sql = `SELECT sno FROM userinfo WHERE email = '${email}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    const tablename = "transactionuser" + result[0].sno;
    const sqlsearch = `select SUM(amount) from ${tablename}
    where MONTH(date)=MONTH(now())`;
    db.query(sqlsearch, (err, results) => {
      if (err) throw err;
      return res.json({
        results,
      });
    });
  });
};
module.exports = showexpences;
