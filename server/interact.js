const express = require("express"),
      router = express.Router(),
      database = require("./database");

router.use((request, response, next) => {
    let emailAddress = request.body.emailAddress, password = request.body.password,
        sql = `SELECT * FROM user WHERE emailAddress="${emailAddress}" AND password="${password}"`,
        user = database.query(sql);
    if (user.length === 1) {
        request.emailAddress = user[0].emailAddress;
        next();
    } else {
        response.json({"authenticity": false})
    }
});

router.post("/device", (request, response) => {
    let sql = `SELECT * FROM device WHERE id="${request.device}"`,
        light = database.query(sql)[0];

    if (light.onOff && request.command === "on" || !light.onOff && request.command === "off") {
        response.json({"changedStatus": false});
    } else if (!light.onOff && request.command === "on") {
        let startTime = new Date(),
            device = request.device,
            user = request.emailAddress;
        sql = `INSERT INTO deviceActivity (startTime, endTime, device, user) VALUES (${startTime},NULL,"${device}","${user}")`;
        database.query(sql);
        sql = `UPDATE device SET onOff = true WHERE id="${device}"`;
        database.query(sql);
        response.json({"ok": true});
    } else if (light.onOff && request.command === "off") {

        sql = `SELECT * FROM deviceActivity WHERE device="${request.device}" AND endTime=NULL`;
        let device = database.query(sql);

        if (device.length === 0) {
            response.json({"changedStatus": false});
        } else {
            device = device[0];
            sql = `UPDATE device SET onOff = false WHERE id="${device}"`;
            database.query(sql);
            sql = `UPDATE deviceActivity SET endTime=${new Date().getTime()} WHERE device="${request.device}" AND endTime=NULL`;
            database.query(sql);
            response.json({"ok": true});
        }
    }
});

router.post("/ew", (request, response) => {

})


module.exports = router;