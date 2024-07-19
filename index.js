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

app.post("/insertStudents", async (req, res) => {
  try {
    console.log("request - ", req.body);
    console.log("Query params - ", req.query);

    const data = req.body;

    // name, rollNo, city, phone
    if (!data.name || !data.rollNo || !data.city || !data.phoneNo) {
      throw "Data is missing";
    }

    const insertQuery = `insert into students(name, city, rollNo, mobileNo) values ("${data.name}", "${data.city}", "${data.rollNo}", "${data.phoneNo}")`;
    await connection.query(insertQuery, (err, rows, fields) => {
      if (err) {
        // console.log("err -- ", err);
        res.status(400).json("Query unsuccesful");
        return;
      }

      res.status(200).json("insert succesfull");
    });
  } catch (err) {
    console.log("error -- ", err);
    res.status(400).json("Query unsuccesful");
  }
});

app.listen(port, () => {
  console.log(`Example app listening in port ${port}`);
});
