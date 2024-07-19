const connection = require("../config/sql");

module.exports = {
  insertStudent: async (data) => {
    const insertQuery = `insert into students(name, city, rollNo, mobileNo) values ("${data.city}", "${data.rollNo}", "${data.phoneNo}")`;

    await connection.query(insertQuery, (err, rows, fields) => {
      console.log("In query - ", err);
      if (err) {
        throw "Error at SQL database";
      }
    });

    return { data: data, status: "Record successfully inserted" };
  },

  updateStudent: async (data) => {
    const updateQuery = `update students set mobileNo = ${data.phoneNo} where rollNo =${data.rollNo} `;

    await connection.query(updateQuery, (err, rows, fields) => {
      console.log("In query - ", rows);
      if (err) {
        throw "error in sql database";
      }
    });

    return { data: data, status: "Update Succesful" };
  },

  deleteStudent: async (data) => {
    const deleteQuery = `delete from students where rollNo = ${data.rollNo} `;

    await connection.query(deleteQuery, (err, rows, fields) => {
      console.log("In query - ", rows);
      if (err) {
        throw "error in sql database";
      }
    });

    return { data: data, status: "Delete Succesful" };
  },
};

connection.on("error", function (err) {
  console.log("[mysql error]", err);
});
