const connection = require("../config/sql");

module.exports = {
  insertStudent: async (data) => {
    const insertQuery = `insert into students(name, city, rollNo, mobileNo) values ("${data.name}", "${data.city}", "${data.rollNo}", "${data.phoneNo}")`;

    const queryPromise = () => {
      return new Promise((resolve, reject) => {
        connection.query(insertQuery, (err, rows, fields) => {
          console.log("In query - ", err);
          if (err) {
            return reject("Error at SQL database");
          }
          console.log(" Rows - ", rows);
          return resolve(rows);
        });
      });
    };

    try {
      const insertStudent = await queryPromise();
      console.log("insert Student - ", insertStudent);
      if (insertStudent) {
        return {
          data: data,
          status: "Record Successfully Inserted",
          success: true,
        };
      }
    } catch (err) {
      console.log("In model err - ", err);
      return { status: err, success: false };
    }
  },

  updateStudent: async (data) => {
    const updateQuery = `update students set mobileNo = ${data.phoneNo} where rollNo =${data.rollNo} `;

    const queryPromise = () => {
      return new Promise((resolve, reject) => {
        connection.query(updateQuery, (err, rows, fields) => {
          console.log("In query - ", err);
          if (err) {
            return reject("Error at SQL database");
          }
          console.log(" Rows - ", rows);
          return resolve(rows);
        });
      });
    };

    return await queryPromise()
      .then((response) => {
        console.log("response - ", response);

        return { data: data, status: "Update Succesful" };
      })
      .catch((err) => {
        console.log("In error = ", err);
        return { status: err, success: false };
      });
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
