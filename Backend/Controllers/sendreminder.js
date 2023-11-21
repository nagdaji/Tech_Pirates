const db = require("../routes/db-config");
// const bcrypt = require("bcryptjs");
// const validator = require("validator");

const sendreminder = async (req, res) => {
  const email = req.body.email;

  const sql = `SELECT * FROM userinfo WHERE email = '${email}'`;
  db.query(sql, async (err, results) => {
    if (err) throw err;
    const sno = results[0].sno;
    const sqlsearch = `SELECT *
    FROM reminder
    WHERE datetime >= NOW()
      AND datetime <= DATE_ADD(NOW(), INTERVAL 12 HOUR) AND sno='${sno} ORDER BY datetime ASC';`;
    db.query(sqlsearch, (err, result) => {
      if (err) throw err;
      const length = result.length;
      //   const length = data1[0].results.length;
      //   const element = data1[0].results;
      // //////////// Watsapp Notification
      for (let i = 0; i < length; i++) {
        const currentDate2 = new Date(result[i].datetime);

        const year2 = currentDate2.getFullYear();
        const month2 = String(currentDate2.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const day2 = String(currentDate2.getDate()).padStart(2, "0");
        const formattedDate = `${year2}-${month2}-${day2}`;
        // Get the time components
        const hours2 = String(currentDate2.getHours()).padStart(2, "0");
        const minutes2 = String(currentDate2.getMinutes()).padStart(2, "0");
        const formattedDateTime = `${hours2}:${minutes2}`;

        const msgremark = result[i].remarks;
        const msgcategory = result[i].category;
        const msgamount = result[i].amount;

        const accountSid = process.env.ACCOUNT_SID;
        const authToken = process.env.AUTH_TOKEN;
        const client = require("twilio")(accountSid, authToken);
        client.messages
          .create({
            body: ` ${
              i + 1
            }.\nYou have a Due Payment for : \nCategory : ${msgcategory} ( ${msgremark} ) \nDate : ${formattedDate} Time : ${formattedDateTime} \nAmount : ${msgamount}`,
            from: "whatsapp:+14155238886",
            to: "whatsapp:+917869789082",
          })
          .then((message) => console.log("Message Sent Successfully"));
        // .done();
      }
      // ----- / messaging ------//

      return res.json({
        result,
      });
    });
  });
};
module.exports = sendreminder;
