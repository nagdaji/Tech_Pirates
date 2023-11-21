const db = require("../routes/db-config");
const printgroups = async (req, res) => {
  const email = req.body.email;

  const sql = `SELECT * FROM groupinfo WHERE memberid= '${email}'`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    return res.json({
      results,
    });
  });
};
module.exports = printgroups;

// SELECT groupname,memberid,COUNT(*) AS `count`
// FROM groupinfo WHERE memberid=''
// GROUP BY `groupname`
