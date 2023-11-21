const db = require("../routes/db-config");
const countMembers = async (req, res) => {
  const groupname = req.body.groupname;

  const sql = `SELECT COUNT(groupname) AS count FROM groupinfo 
  WHERE groupname='${groupname}'
  `;
  db.query(sql, (err, results) => {
    if (err) throw err;
    return res.json({
      results,
    });
  });
};
module.exports = countMembers;
