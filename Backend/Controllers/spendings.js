const db = require("../routes/db-config");
const spending = async (req, res) => {
  const email = req.body.email;
  //   console.log(email);

  const sql = `SELECT sno FROM userinfo WHERE email = '${email}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    const tablename = "transactionuser" + result[0].sno;
    const sqlsearch = `SELECT * FROM ${tablename} ORDER BY date desc`;
    // console.log(tablename);
    db.query(sqlsearch, (err, results) => {
      if (err) throw err;
      //   console.log(results);
      return res.json({
        results,
      });
    });
  });
};
module.exports = spending;
