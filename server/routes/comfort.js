const express = require("express"),
    router = express.Router(),
    database = require("./database");

router.post("/getThermostat", (request, response) => {
    let sql = `SELECT thermostat FROM hub WHERE id = (SELECT hub FROM user WHERE emailAddress="${request.body.emailAddress}")`,
        result = database.query(sql);
    response.json({"temperature":result[0].thermostat});
});

router.post("/setThermostat", (request, response) => {
    let sql = `UPDATE hub SET thermostat = ${request.body.value} WHERE id = (SELECT hub FROM user WHERE emailAddress="${request.body.emailAddress}")`;
    database.query(sql);
    sql = `SELECT thermostat FROM hub WHERE id = (SELECT hub FROM user WHERE emailAddress="${request.body.emailAddress}")`;
    let result = database.query(sql);
    response.json({"temperature":result[0].thermostat});
});

module.exports = router;