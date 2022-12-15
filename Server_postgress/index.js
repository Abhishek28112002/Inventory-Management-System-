const express = require("express");

const client = require("./connection.js");
const app = express();
const data = require("./router/data");
const login = require("./router/Login");
const bodyParser = require("body-parser");

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use("/loginapi", login);
app.use("/eventapi", data);

app.get("/", (req, res) => {
  res.status(200).send("Connected to Login API");
});

app.listen(process.env.PORT || 8025, () => {
  console.log("Listening on port");
});

client.connect((err, result) => {
  if (err) console.log(err);
  else console.log("Database is connected successfully");
});
