const db = require("../routes/db-config");

const updatesaving = async (req, res) => {
  const saving = req.body.saving;
  const email = req.body.email;
  // console.log(saving);
  const sql = `SELECT * FROM userinfo WHERE email = '${email}'`;
  db.query(sql, async (err, results) => {
    if (err) throw err;
    const sno = results[0].sno;
    const sqlinsert = `UPDATE userinfo SET expectedsaving='${saving}' WHERE sno='${sno}'`;
    db.query(sqlinsert, (err, result) => {
      if (err) throw err;
    });
    return res.json({
      status: "success",
      message: `Saving Updated Successfully `,
    });
  });
};
module.exports = updatesaving;
