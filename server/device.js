const express = require("express"),
      router = express.Router(),
      database = require("./database");

router.post("/deviceUsage", (request, response) => {
    let x = request.body.id;
    let sql = `SELECT SUM(Energy) FROM deviceActivity WHERE device = "${x}"`;
    let energy = database.query(sql);
    console.log(energy);
    if(energy > 1){
        response.json({"message": "ok"});
    }else{
        response.json({"message": "invalid id"});
    }
});


router.post("/totalEnergyUse", (request, response) => {
    let sql = `SELECT SUM(ENERGY) FROM deviceActivity`;
    let energy = database.query(sql);

    if(energy == 1){
        response.json({"message": "ok"});
    }else{
        response.json({"message": "error"});
    }
});

module.exports = router;