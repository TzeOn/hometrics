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

router.post("/roomDevices", (request, response) => {
    let sql = `select smartPlug.id as plugId, device.id as deviceId, device.name as deviceName, device.onOff from smartPlug left join device on device.plug = smartPlug.id where smartPlug.roomName = "${request.body.roomName}"`,
        roomDevices = database.query(sql);
    for (let i=0; i<roomDevices.length; i++)
        roomDevices[i].onOff = roomDevices[i].onOff === 1;
    response.json({roomDevices: roomDevices});
});

router.post("/toggle", (request, response) => {
    let sql = `UPDATE device SET onOff=${request.body.onOff} WHERE id="${request.body.deviceId}"`;
    database.query(sql);
    sql = `select * from device where id="${request.body.deviceId}"`;
    let result = database.query(sql);
    response.json({"ok": result});
});

router.post("/remove", (request, response) => {
    let sql = `UPDATE device SET plug=NULL WHERE id="${request.body.deviceId}"`;
    database.query(sql);
    response.json({"ok": true})
});

function makeid() {
    let id = '',
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i=0; i<12; i++ )
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    return id;
}

router.post("/add", (request, response) => {
    let device = request.body.device,
        sql = `SELECT * FROM device WHERE name="${device.name}"`,
        result = database.query(sql);
        if (result.length !== 0) {
            sql = `UPDATE device SET plug="${request.body.plugId}" WHERE name="${result[0].name}"`;
            database.query(sql);
            response.json(result[0]);
        } else {
            let id,
                exist = [];
            do {
                id = makeid();
                result = database.query(`SELECT * FROM device WHERE id="${id}"`);
            } while (exist.length !== 0);
            sql = `INSERT INTO device (id,name,plug,onOff,energyPerHour) VALUES ("${id}","${device.name}","${request.body.plugId}",0,${Math.floor(Math.random() * (3000 - 600 + 1) + 600)})`;
            database.query(sql);
            sql = `select smartPlug.id as plugId, device.id as deviceId, device.name as deviceName, device.onOff from smartPlug left join device on device.plug = smartPlug.id where device.id = "${id}"`;
            result = database.query(sql);
            response.json(result[0]);
        }
});

module.exports = router;