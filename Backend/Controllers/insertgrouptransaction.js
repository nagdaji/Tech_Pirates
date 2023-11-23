const db = require("../routes/db-config");
const insertgrouptransaction = async (req, res) => {
  const groupcode = req.body.groupcode;
  const mail = req.body.mail;
  const amount = req.body.amount;
  const adminmail = req.body.usermail;
  const date = req.body.date;

  const sql = `INSERT INTO grouptransaction (groupcode, giver, reciever, amount,date) VALUES ('${groupcode}', '${mail}', '${adminmail}', '${amount}',"${date}")`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    return res.json({
      status: "success",
      message: `Data Saved Successfully`,
    });
  });
};
module.exports = insertgrouptransaction;
