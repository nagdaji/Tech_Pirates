const db = require("../routes/db-config");
const printreminder = async (req, res) => {
  const email = req.body.email;

  const sql = `SELECT sno FROM userinfo WHERE email = '${email}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;

    const currentDate2 = new Date();

    const year2 = currentDate2.getFullYear();
    const month2 = String(currentDate2.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day2 = String(currentDate2.getDate()).padStart(2, "0");
    // Get the time components
    const hours2 = String(currentDate2.getHours()).padStart(2, "0");
    const minutes2 = String(currentDate2.getMinutes()).padStart(2, "0");
    const formattedDate = `${year2}-${month2}-${day2}T${hours2}:${minutes2}`;
    // console.log(formattedDate);
    const sno = result[0].sno;
    const sqlsearch = `select DATE_FORMAT(datetime, '%Y-%m-%d') AS date, 
    DATE_FORMAT(datetime, '%H:%i:%s') AS time ,rid,amount,remarks,category from reminder
    where sno=${sno} AND datetime >= '${formattedDate}' ORDER BY datetime`;
    db.query(sqlsearch, (err, results) => {
      if (err) throw err;
      const deletesql = `DELETE FROM reminder where sno=${sno} AND datetime < '${formattedDate}'`;
      db.query(deletesql, (err, result2) => {
        if (err) throw err;
      });
      return res.json({
        results,
      });
    });
  });
};
module.exports = printreminder;
