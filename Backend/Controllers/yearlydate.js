const db = require("../routes/db-config");
const yearlydate = async (req, res) => {
  const email = req.body.email;

  // console.log(date);
  const sql = `SELECT sno FROM userinfo WHERE email = '${email}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    //////////find date//////////
    const tablename = "transactionuser" + result[0].sno;
    const sqlsearch = `SELECT SUM(amount),date FROM ${tablename}
    where date > now() - INTERVAL 365 day
    group by date;`;
    db.query(sqlsearch, (err, results) => {
      if (err) throw err;
      return res.json({
        results,
      });
    });
  });
};

module.exports = yearlydate;
