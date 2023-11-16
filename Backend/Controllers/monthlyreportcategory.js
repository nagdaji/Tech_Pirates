const db = require("../routes/db-config");
const monthlyreportcategory = async (req, res) => {
  const email = req.body.email;

  // console.log(date);
  const sql = `SELECT sno FROM userinfo WHERE email = '${email}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    //////////find date//////////
    const tablename = "transactionuser" + result[0].sno;
    const sqlsearch = `SELECT SUM(amount),category FROM ${tablename}
    where date > now() - INTERVAL 31 day
    group by category;`;
    db.query(sqlsearch, (err, results) => {
      if (err) throw err;
      return res.json({
        results,
      });
    });
  });
};

module.exports = monthlyreportcategory;
