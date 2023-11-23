const db = require("../routes/db-config");
const Printgrouptransaction = async (req, res) => {
  const email = req.body.email;
  const code = req.body.code;

  const sql = `SELECT * FROM grouptransaction WHERE (reciever= '${email}' OR giver='${email}') AND groupcode ='${code}'`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    return res.json({
      results,
    });
  });
};
module.exports = Printgrouptransaction;

// SELECT groupname,memberid,COUNT(*) AS `count`
// FROM groupinfo WHERE memberid=''
// GROUP BY `groupname`
