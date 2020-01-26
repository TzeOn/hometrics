const express = require("express"),
      router = express.Router(),
      database = require("./database"),
      nodemailer = require("nodemailer");

router.post("/test", (request, response) => {
    let x = request.body.id;
    let sql = `SELECT * FROM device WHERE id= "${x}"`;
    let device = database.query(sql);
    if(device.length > 0){
        console.log("there is a device with this id");
    }else{
        console.log("there is not a device with this id");
    }
});

module.exports = router;