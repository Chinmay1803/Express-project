const mySql = require("mysql");

const connection = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

connection.connect((err) => {
    if(err) throw err;
    else{
        console.log("connection is successful");
    }
});

connection.on('error', function(err) {
    console.log("[mysql error]",err);
  });

module.exports = connection;
