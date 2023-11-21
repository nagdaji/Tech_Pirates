const db = require("../routes/db-config");
const getcreatorname = async (req, res) => {
  const ownername = req.body.ownername;

  const sql = `SELECT fullname FROM userinfo 
  WHERE email='${ownername}'
  `;
  db.query(sql, (err, results) => {
    if (err) throw err;
    return res.json({
      results,
    });
  });
};
module.exports = getcreatorname;
