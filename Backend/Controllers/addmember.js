const db = require("../routes/db-config");

const addmember = async (req, res) => {
  const email = req.body.email;
  const mememail = req.body.mememail;
  const code = req.body.code;
  //   console.log(email);
  //   console.log(mememail);
  //   console.log(grpname);
  const sqlsearch = `SELECT groupname FROM groupinfo WHERE groupcode = '${code}'`;

  db.query(sqlsearch, (err, result) => {
    if (err) throw err;
    const grpname = result[0].groupname;

    const sql = `INSERT INTO groupinfo (memberid, groupcode, groupname,ownername) VALUES ('${mememail}', '${code}', '${grpname}','${email}')`;
    db.query(sql, async (err, results) => {
      if (err) throw err;
    });
    return res.json({
      status: "success",
      message: `Member Added Successfully`,
    });
  });
};
module.exports = addmember;
