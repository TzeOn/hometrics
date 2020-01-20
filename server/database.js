var MySql = require('sync-mysql');

var connection = new MySql({
    host: 'localhost',
    user: 'hometrics',
    password: 'hometrics',
    database: "hometrics"
});

module.exports = connection;