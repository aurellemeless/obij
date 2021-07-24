const mysql = require('mysql');
const database  = mysql.createConnection({
  connectionLimit : 10,
  multipleStatements: true,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'obij'
});
module.exports =  database;