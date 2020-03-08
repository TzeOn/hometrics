const express = require("express"),
      router = express.Router(),
      database = require("./database"),
      date = require("date-and-time");

let ac  = "";
let light = "";

router.get("/", (request, response) => {
    let time = date.format(new Date(), "HH:mm"),
        sql = `SELECT * FROM weather WHERE time="${time}"`,
        weather = database.query(sql)[0];
    response.json(weather);
});

router.get("/adjust", (request, response) => {
    response.json({
        "ac": ac,
        "lighting": light
    })
});

function doStuff() {
    let time = date.format(new Date(), "HH:mm"),
        sql = `SELECT * FROM weather WHERE time="${time}"`,
        weather = database.query(sql)[0];
    if (weather.humidity <= 53)
        ac = "low";
    else if (weather.humidity >= 64 && weather.humidity <=67)
        ac = "moderate";
    else
        ac = "high";

    if (weather.lighting <= 0)
        light = "low";
    else
        light = "moderate";
};

function run() {
    setInterval(doStuff, 60000);
};
run();

module.exports = router;