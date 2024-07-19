const express = require("express");
const bodyparser = require("body-parser");
const connection = require("./config/sql");
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const port = 4000;

app.get("/", (_, res) => {
  res.send("Hello World");
});

const studentRoute = require('./controller/students');
app.use('/student', studentRoute);

app.listen(port, () => {
  console.log(`Example app listening in port ${port}`);
});
