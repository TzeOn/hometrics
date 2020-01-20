const express = require("express"),
      router = express.Router(),
      database = require("./database"),
      date = require("date-and-time");

let weather;
function refresh() {
    let time = date.format(new Date(), "HH:mm"),
        sql = `SELECT * FROM weather WHERE time="${time}"`,
        weather = database.query(sql)[0];
    setTimeout(refresh, 60000);
}
refresh();

router.get("/weather", (request, response) => {
    response.json(weather);
});

module.exports = router;