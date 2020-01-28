const express = require("express"),
      router = express.Router(),
      database = require("./database");

router.post("/energyUsage", (request, response) => {
    let x = request.body.id;
    let sql = `SELECT SUM(ENERGY) FROM deviceActivity WHERE id= "${x}"`;
    let energy = database.query(sql);

    console.log(energy);
});

module.exports = router;