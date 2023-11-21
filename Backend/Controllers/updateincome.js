const db = require("../routes/db-config");

const updateincome = async (req, res) => {
  const income = req.body.income;
  const email = req.body.email;
  const sql = `SELECT * FROM userinfo WHERE email = '${email}'`;
  db.query(sql, async (err, results) => {
    if (err) throw err;
    const sno = results[0].sno;
    const sqlinsert = `UPDATE userinfo SET income='${income}' WHERE sno='${sno}'`;
    db.query(sqlinsert, (err, result) => {
      if (err) throw err;
    });
    return res.json({
      status: "success",
      message: `Income Updated Successfully `,
    });
  });
};
module.exports = updateincome;
