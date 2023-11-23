const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const path = require("path");
const db = require("./routes/db-config");
const cookie = require("cookie-parser");
const PORT = process.env.PORT || 8000;

const csspath = path.join(__dirname, "/public/CSS");
const jspath = path.join(__dirname, "/public/Javascript");
const imgpath = path.join(__dirname, "/public/images");
app.use("/Javascript", express.static(jspath));
app.use("/CSS", express.static(csspath));
app.use("/images", express.static(imgpath));
app.use(express.static("public"));

app.set("view engine", "hbs");
app.set("views", "./views");
app.use(cookie());
app.use(express.json());

db.connect((err) => {
  if (err) throw err;
  console.log("connected");
});

// //////////// Watsapp Notification

// const accountSid = process.env.ACCOUNT_SID;
// const authToken = process.env.AUTH_TOKEN;
// const client = require("twilio")(accountSid, authToken);

// client.messages
//   .create({
//     body: "Your appointment is coming up on July 21 at 3PM",
//     from: "whatsapp:+14155238886",
//     to: "whatsapp:+917869789082",
//   })
//   .then((message) => console.log(message.sid));
// // .done();

// // ----- / messaging ------//

app.use("/", require("./routes/pages"));

app.use("/api", require("./Controllers/auth"));

// for logged in user content

app.use("/dashboard", require("./Controllers/auth"));

app.listen(PORT);
