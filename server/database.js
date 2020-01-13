const mysql = require("mysql");

let pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "hometrics",
    password: "hometrics",
    database: "hometrics"
});

module.exports = pool;