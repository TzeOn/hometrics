const express = require("express"),
      router = express.Router(),
      database = require("./database"),
      date = require("date-and-time");

router.get("/", (request, response) => {
    let time = date.format(new Date(), "HH:mm"),
        sql = `SELECT * FROM weather WHERE time="${time}"`,
        weather = database.query(sql)[0];
    response.json(weather); 

});

module.exports = router;