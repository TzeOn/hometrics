const express = require("express"),
      router = express.Router(),
      database = require("./database");

router.post("/comfort/thermostat", (request, response) => {
    let thermostat = request.thermostat;
    if (thermostat > 0 && thermostat <= 30) {
        let sql = `UPDATE comfort SET thermostat="${thermostat}" WHERE hub=(SELECT hub FROM user WHERE emailAddress="${request.session.emailAddress}")`;
        database.query(sql);
        response.end("ok");
    } else
        response.json({
            "thermostat": false
        });
});

module.exports = router;