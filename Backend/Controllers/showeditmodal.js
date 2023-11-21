const db = require("../routes/db-config");
const showeditmodal = async (req, res) => {
  const code = req.body.code;

  const sql = `SELECT * FROM groupinfo WHERE groupcode = '${code}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return res.json({
      result,
    });
  });
};
module.exports = showeditmodal;
