const db = require("../routes/db-config");
const showincome = async (req, res) => {
  const email = req.body.email;

  const sql = `SELECT sno FROM userinfo WHERE email = '${email}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    const sqlsearch = `SELECT income,expectedsaving FROM userinfo WHERE sno='${result[0].sno}'`;
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
module.exports = showincome;
