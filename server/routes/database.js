const MySql = require('sync-mysql');

const connection = new MySql({
    user: 'hometrics',
    password: 'hometrics',
    database: "hometrics"
});

module.exports = connection;