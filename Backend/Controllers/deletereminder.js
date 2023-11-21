const db = require("../routes/db-config");

const deletereminder = async (req, res) => {
  const id = req.body.rid;

  const sqldelete = `DELETE FROM reminder WHERE rid = '${id}'`;
  // console.log(tablename);
  db.query(sqldelete, (err, result) => {
    if (err) throw err;
  });
  return res.json({
    status: "success",
    message: `Reminder Deleted Successfully`,
  });
};
module.exports = deletereminder;
