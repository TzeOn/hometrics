const express = require("express"),
      router = express.Router(),
      database = require("./database");

router.get("/room", (request, response) => {
    let sql = `SELECT * FROM room`,
        rooms = database.query(sql);
    let reply = [];
    for (let i=0; i<rooms.length; i++) {
        sql = `SELECT COUNT(*) AS numberOfDevices FROM device INNER JOIN smartPlug ON device.plug = smartPlug.id WHERE smartPlug.roomName = "${rooms[i].roomName}"`;
        console.log(database.query(sql));
        let numberOfDevices = database.query(sql)[0].numberOfDevices;
        console.log(numberOfDevices);
        reply.push({
            "name": rooms[i].roomName,
            "numberOfDevices": numberOfDevices
        })
    }
    response.json(reply);
});

module.exports = router;