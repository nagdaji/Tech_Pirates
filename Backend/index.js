const express = require("express");
const app = express();
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

app.use("/", require("./routes/pages"));

app.use("/api", require("./Controllers/auth"));

// for logged in user content

app.use("/dashboard", require("./Controllers/auth"));

app.listen(PORT);
