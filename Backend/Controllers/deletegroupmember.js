const db = require("../routes/db-config");

const deletegroupmember = async (req, res) => {
  const email = req.body.email;
  const code = req.body.code;

  const sqldelete = `DELETE FROM groupinfo WHERE memberid = '${email}' AND groupcode='${code}' `;
  // console.log(tablename);
  db.query(sqldelete, (err, result) => {
    if (err) throw err;
    return res.json({
      status: "success",
      message: `Member Deleted Sccessfully`,
    });
  });
};
module.exports = deletegroupmember;
