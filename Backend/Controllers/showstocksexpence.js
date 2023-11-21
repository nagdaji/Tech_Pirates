const db = require("../routes/db-config");
const showstocksexpence = async (req, res) => {
  const email = req.body.email;

  const sql = `SELECT sno FROM userinfo WHERE email = '${email}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    const tablename = "transactionuser" + result[0].sno;
    const sqlsearch = `select SUM(amount) from ${tablename}
    where category='Stocks'`;
    db.query(sqlsearch, (err, results) => {
      if (err) throw err;
      return res.json({
        results,
      });
    });
  });
};
module.exports = showstocksexpence;
