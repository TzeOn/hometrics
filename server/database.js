const MySql = require('sync-mysql');

const connection = new MySql({
    host: 'localhost',
    user: 'hometrics',
    password: 'hometrics',
    database: "hometrics"
});

module.exports = connection;