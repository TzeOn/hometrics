const express = require("express"),
      router = express.Router(),
      database = require("./database");

//constants in ms
const HOUR = 3600000,
      DAY = 86400000, 
      WEEK = 604800000,
      MONTH = 2419200000,
      YEAR = 31536000000;


//make sure we show the user their data and not someone elses
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


//gets the amunt of energy a single user has used
router.post("/totalUserEnergy", (request, response) => {
    let user = request.body.user;
    let energyQuery = database.query(`SELECT energyPerHour,id FROM device`);
    let timeQuery = database.query(`SELECT startTime,endTime,device FROM deviceActivity WHERE user = "${user}"`);
    let result = 0;

    timeQuery = limitTimeFrame(timeQuery, request.body.timeFrame);
    
    result = calculateEnergy(energyQuery, timeQuery);

    if(result){
        response.json({"user":user,"usage":result});
    }else if(result === 0){
        response.json({"user":user,"usage":"no usage"});
    }else{
        response.json({"message":"error"});
    }
});


//get the total energy use for the house
router.post("/totalHomeEnergy", (request, response) => {
    let energyQuery = database.query(`SELECT energyPerHour,id FROM device`);
    let timeQuery = database.query(`SELECT startTime,endTime,device FROM deviceActivity`);
    let result = 0;

    timeQuery = limitTimeFrame(timeQuery, request.body.timeFrame);

    result = calculateEnergy(energyQuery, timeQuery);
    

    if(result){
        response.json({"message":result});
    }else{
        response.json({"message":"error"});
    }
});


//returns the date and time based on the UNIX time
router.post("/getDateTime", (request, response) => {
    let device = request.body.device;
    let deviceDates = database.query(`SELECT * FROM deviceActivity WHERE device = "${device}";`);
    deviceDates[0].endTime = new Date(deviceDates[0].endTime);
    deviceDates[0].startTime = new Date(deviceDates[0].startTime);
    
    response.json(deviceDates);
});




//TODO
router.post("/scoreboard", (request, response) => {
    let numOfUsers = database.query(`SELECT COUNT(emailAddress) AS count FROM user;`);
    numOfUsers = numOfUsers[0].count;
    let users = [];

    for(i=0  ;i<numOfUsers ; i++){
        users.push("localhost:3000/device/totalUserEnergy");
    }
    response.json(users);
});


//TODO
//helper function
//takes an array of device activities and returns 
//an array with only the ones that are in the time frame we're interested in
function limitTimeFrame(timeQuery, timeFrame){
    let currentTime = new Date().getTime();
    let result = [];

    switch(timeFrame){
        case "hour":
            timeFrame = HOUR;
        break;
        case "day":
            timeFrame = DAY;
        break;
        case "week":
            timeFrame = WEEK;
        break;
        case "month":
            timeFrame = MONTH;
        break;
        case "year":
            timeFrame = YEAR;
        break;
    }

    
    for(i=0  ;i<timeQuery.length ; i++){ //for each element
        if(timeQuery[i].endTime >= currentTime - timeFrame){ //in the correct time frame
            result.push(timeQuery[i]);
        }
    }

    return result;
}



//Helper function
//calculates how much energy has been used based on
//the duration and the device in question
function calculateEnergy(energyQuery, timeQuery){
    let result = 0;

    //work out result
    for(i=0 ; i<timeQuery.length ; i++){
        for(j=0 ; j<energyQuery.length ; j++){
            if(timeQuery[i].device === energyQuery[j].id){
                let milliseconds = timeQuery[i].endTime - timeQuery[i].startTime;
                result += milliseconds * energyQuery[j].energyPerHour / HOUR;
            }
        }
    }

    return result;
}



module.exports = router;