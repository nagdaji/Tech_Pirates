const db = require("../routes/db-config");

const creategroup = async (req, res) => {
  const email = req.body.email;
  const grpcode = req.body.teamcode;
  const grpname = req.body.grpname;

  const sql = `INSERT INTO groupinfo (memberid, groupcode, groupname,ownername) VALUES ('${email}', '${grpcode}', '${grpname}','${email}')`;
  db.query(sql, async (err, results) => {
    if (err) throw err;
    return res.json({
      status: "success",
      message: `Group Created Successfully`,
    });
  });
};
module.exports = creategroup;
