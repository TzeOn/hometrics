const express = require("express"),
      router = express.Router(),
      database = require("./database");

const HOUR = 3600000,
      DAY = 86400000, 
      WEEK = 604800000,
      MONTH = 2419200000,
      YEAR = 31536000000;


/*  This is just used so that the server doesnt have to ask
*   for the users email and password everytime it gets a request
*/
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


//TODO
router.post("/totalUserEnergy", (request, response) => {
    let user = request.body.id;
    let sql = `SELECT SUM(Energy) FROM deviceActivity WHERE user = "${user}"`;
    let energy = database.query(sql);

    if(energy == 1){
        response.json({"message": energy});
    }else{
        response.json({"message": "error"});
    }
});


router.post("/totalHomeEnergy", (request, response) => {
    let energyQuery = database.query(`SELECT energyPerHour,id FROM device`);
    let timeQuery = database.query(`SELECT startTime,endTime,device FROM deviceActivity`);
    let duration = request.body.duration;
    let currentTime = new Date().getTime();

    switch(duration){
        case "week":
            duration = WEEK;
        break;
        case "month":
            duration = MONTH;
        break;
        case "year":
            duration = YEAR;
        break;
    }

    for(i=0  ;i<timeQuery.length ; i++){
        if(timeQuery[i].endTime < currentTime - duration){
            timeQuery[i] = 0;
        }
    }

    let result = 0;
    
    for(i=0 ; i<timeQuery.length ; i++){
        for(j=0 ; j<energyQuery.length ; j++){
            if(timeQuery[i].device == energyQuery[j].id){
                let milliseconds = timeQuery[i].endTime - timeQuery[i].startTime;
                result += milliseconds * energyQuery[j].energyPerHour / HOUR;
            }
        }
    }

    if(result){
        response.json({"message":result});
    }else{
        response.json({"message":"error"});
    }
});


//TODO
router.post("/scoreboard", (request, response) => {

    let sql = `SELECT * from `

});



router.post("/personalBreakdown", (request, response) => {
    let user = request.body.id;
    let sql = `SELECT * FROM deviceActivity WHERE user="${user}"`;
    let breakdown = database.query(sql);

    if(breakdown < 1){
        response.json({"message": "no activity"});
    }else{
        response.json(breakdown);
    }

});

module.exports = router;