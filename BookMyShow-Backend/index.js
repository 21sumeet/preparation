const bodyParser = require("body-parser");
const express = require("express");
const app = express();
cont = dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/home", (req, res) => {
  res.send("Home Page");
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
