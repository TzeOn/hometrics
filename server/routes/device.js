const express = require("express"),
      router = express.Router(),
      database = require("./database"),
      date = require("date-and-time");


// Constants in milliseconds.
const HOUR = 3600000,
      DAY = 86400000, 
      WEEK = 604800000,
      MONTH = 2419200000,
      YEAR = 31536000000;

router.post("/activity", (request, response) => {
    let sql = `SELECT device.name, deviceActivity.startTime, deviceActivity.endTime, device.plug FROM deviceActivity INNER JOIN device ON deviceActivity.device = device.id WHERE deviceActivity.user="${request.body.emailAddress}"`,
     deviceActivity = database.query(sql).sort((a, b) => b.endTime - a.endTime), 
     timeline = [];     
    for (let i=0; i<deviceActivity.length; i++) {
        let activity = deviceActivity.pop(),
            sql = `SELECT roomName from smartPlug where id="${activity.plug}"`,
            room = database.query(sql)[0].roomName;
        timeline.push({
            "title": activity.name,
            "time": date.format(new Date(activity.startTime), 'DD/MM/YYYY HH:mm:ss'),
            "description":  room + "\n" + (activity.endTime - activity.startTime)/HOUR + " hrs\n\n\n"
        })
    }
    response.json({deviceActivity: timeline});
});

router.post("/allActivity", (request, response) => {
    let sql = `SELECT device.name, deviceActivity.user, deviceActivity.startTime, deviceActivity.endTime, device.plug FROM deviceActivity INNER JOIN device ON deviceActivity.device = device.id`,
        deviceActivity = database.query(sql).sort((a, b) => b.endTime - a.endTime),
        timeline = [];
    for (let i=0; i<deviceActivity.length; i++) {
        let activity = deviceActivity.pop(),
            sql = `SELECT roomName from smartPlug where id="${activity.plug}"`,
            room = database.query(sql)[0].roomName,
            name = "(" + database.query(`SELECT forename from user where emailAddress = "${activity.user}"`)[0].forename + ")";

        timeline.push({
            "title": activity.name + "\n" + name,
            "time": date.format(new Date(activity.startTime), 'DD/MM/YYYY HH:mm:ss'),
            "description":  room + "\n" + (activity.endTime - activity.startTime)/HOUR + " hrs\n\n\n"
        })
    }
    response.json({deviceActivity: timeline});
});

const getUserTotalEnergy = (emailAddress) => {
    var sql = `select device.energyPerHour, deviceActivity.startTime, deviceActivity.endTime from deviceActivity inner join device on device.id = deviceActivity.device where deviceActivity.user = "${emailAddress}" `;
    var result = database.query(sql);
    var total = 0 ;
    for (var i=0; i<result.length; i++) {
        let duration = new Date(result[i].endTime) - new Date(result[i].startTime);
        duration = ((duration / (1000*60*60)) % 24); // ms to hrs.
        total += duration * result[i].energyPerHour;
    }
    return total;
};

router.post("/scoreboard", (request, res) => {
    let sql = `select emailAddress from user where hub = (select hub from user where emailAddress = "${request.body.emailAddress}")`;
    let result = database.query(sql);
    var response = [];
    for (var i=0; i<result.length; i++) {
        let ooh = getUserTotalEnergy(result[i].emailAddress);
        response.push({
            x: result[i].emailAddress,
            y: ooh,
            color: "orange"
        });
    }
    response.sort((a, b) => {return a.y - b.y});
    res.json({"scoreboard": response})
});

router.post("/comparison", (request, response) => {
    let sql = `select emailAddress from user where hub = (select hub from user where emailAddress = "${request.body.emailAddress}")`;
    let result = database.query(sql);

    // get total house excluding emailAddress
    var house = 0;
    var person = 0;
    for (var i=0; i<result.length; i++) {
        if (result[i].emailAddress !== request.body.emailAddress) {
            let ooh = getUserTotalEnergy(result[i].emailAddress);
            house = house + ooh;
        } else {
            person = getUserTotalEnergy(result[i].emailAddress);
        }
    }
    response.json({"comparison": [
            {
                value: person,
                label: "You",
                color: "green"
            },
            {
                value: house,
                label: "House",
                color: "orange"
            }
        ]});
});



/*
 * KEEP THIS FUNCTION, IT WORKS.
 * Body: emailAddress
 * Returns an array breaking down energy usage.
 */
router.post("/userEnergyBreakdown", (request, response) => {
    let user = request.body.emailAddress,
        energyQuery = database.query(`SELECT energyPerHour,id FROM device`),
        timeQuery = database.query(`SELECT startTime,endTime,device FROM deviceActivity WHERE user = "${user}"`),
        time = timeQuery,
        result = '{"weekly": [',
        currentTime = new Date();
    for(a=6 ; a>=0 ; a--){
        time = limitTimeFrame2(timeQuery, currentTime-(DAY*a), currentTime-(DAY*(a-1)));
        result = result.concat('{"x":"',dayToString((new Date(currentTime-(DAY*a))).getDay()),'", "y":',calculateEnergy(energyQuery, time), '},');
    }
    result = result.substring(0,result.length-1);
    result = result.concat('],"monthly":[');

    for(e=3 ; e>=0 ; e--){
        time = limitTimeFrame2(timeQuery, currentTime-(WEEK*e), currentTime-(WEEK*(e-1)));
        result = result.concat('{"x":"',e,'", "y":',calculateEnergy(energyQuery, time), '},');
    }
    result = result.substring(0,result.length-1);
    result = result.concat('],"yearly":[');

     for(y=11 ; y>=0 ; y--){
         time = limitTimeFrame2(timeQuery, currentTime-(MONTH*y), currentTime-(MONTH*(y-1)));
         result = result.concat('{"x":"',monthToString((new Date(currentTime-(MONTH*y))).getMonth()),'", "y":',calculateEnergy(energyQuery, time), '},');
     }
     result = result.substring(0,result.length-1);
    result = result.concat(']}');
    result = JSON.parse(result);


   response.json(result);
});




router.post("/comparison", (request, response) => {
    let user = request.body.emailAddress,
    

    result = '{"weekly":[';

    let energyQuery = database.query(`SELECT energyPerHour,id FROM device`);
    let timeQuery = database.query(`SELECT startTime,endTime,device FROM deviceActivity`);
    timeQuery = limitTimeFrame1(timeQuery, 'week');
    let homeUse = calculateEnergy(energyQuery, timeQuery);

    energyQuery = database.query(`SELECT energyPerHour,id FROM device`),
    timeQuery = database.query(`SELECT startTime,endTime,device FROM deviceActivity WHERE user = "${user}"`);
    timeQuery = limitTimeFrame1(timeQuery, 'week');
    userUse = calculateEnergy(energyQuery, timeQuery);

    homeUse -= userUse;

    result = result.concat('{"house": ',homeUse, ', "user": ',userUse, '}],"monthly":[');


    energyQuery = database.query(`SELECT energyPerHour,id FROM device`);
    timeQuery = database.query(`SELECT startTime,endTime,device FROM deviceActivity`);
    timeQuery = limitTimeFrame1(timeQuery, 'month');
    homeUse = calculateEnergy(energyQuery, timeQuery);

    energyQuery = database.query(`SELECT energyPerHour,id FROM device`),
    timeQuery = database.query(`SELECT startTime,endTime,device FROM deviceActivity WHERE user = "${user}"`);
    timeQuery = limitTimeFrame1(timeQuery, 'month');
    userUse = calculateEnergy(energyQuery, timeQuery);

    homeUse -= userUse;
    

    
    result = result.concat('{"house": ',homeUse, ', "user": ',userUse, '}],"yearly":[');

    
    energyQuery = database.query(`SELECT energyPerHour,id FROM device`);
    timeQuery = database.query(`SELECT startTime,endTime,device FROM deviceActivity`);
    timeQuery = limitTimeFrame1(timeQuery, 'year');
    homeUse = calculateEnergy(energyQuery, timeQuery);

    energyQuery = database.query(`SELECT energyPerHour,id FROM device`),
    timeQuery = database.query(`SELECT startTime,endTime,device FROM deviceActivity WHERE user = "${user}"`);
    timeQuery = limitTimeFrame1(timeQuery, 'year');
    userUse = calculateEnergy(energyQuery, timeQuery);

    homeUse -= userUse;
    
    result = result.concat('{"house": ',homeUse, ', "user": ',userUse, '}]}');


    result = JSON.parse(result);
    
    response.json(result);
    
});


//get the total energy use for the house
//body: timeFrame
//returns: amount of total energy used in the whole house during the time period
router.post("/totalHomeEnergy", (request, response) => {
    let energyQuery = database.query(`SELECT energyPerHour,id FROM device`);
    let timeQuery = database.query(`SELECT startTime,endTime,device FROM deviceActivity`);
    let result = 0;

    timeQuery = limitTimeFrame1(timeQuery, request.body.timeFrame);

    result = calculateEnergy(energyQuery, timeQuery);
    

    if(result){
        response.json({"message":result});
    }else{
        response.json({"message":"error"});
    }
});


//returns the date and time based on the UNIX time
//body: device
//returns: json with the start and end times that the device was used
router.post("/getDateTime", (request, response) => {
    let device = request.body.device;
    let deviceDates = database.query(`SELECT * FROM deviceActivity WHERE device = "${device}";`);
    deviceDates[0].endTime = new Date(deviceDates[0].endTime);
    deviceDates[0].startTime = new Date(deviceDates[0].startTime);
    
    response.json(deviceDates);
});


//helper function
//takes an array of device activities and returns 
//an array with only the ones that are in the time frame we're interested in
function limitTimeFrame2(timeQuery, startTime, endTime){
    let result = [];
    
    for(c=0  ;c<timeQuery.length ; c++){ //for each element
        if(timeQuery[c].startTime > startTime && timeQuery[c].startTime < endTime && timeQuery[c].endTime > startTime && timeQuery[c].endTime < endTime){ //in the correct time frame
            result.push(timeQuery[c]);
        }
    }

    return result;
}


//helper function
//takes an array of device activities and returns 
//an array with only the ones that are in the time frame we're interested in
function limitTimeFrame1(timeQuery, timeFrame){
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


function dayToString(day) {
    switch(day){
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
    }
}

function monthToString(month){
    switch(month){
        case 0:
            return "January"
        case 1:
            return "Febuary"
        case 2:
            return "March"
        case 3:
            return "April"
        case 4:
            return "May"
        case 5:
            return "June"
        case 6:
            return "July"
        case 7:
            return "August"
        case 8:
            return "September"
        case 9:
            return "October"
        case 10:
            return "November"
        case 11:
            return "December"
    }
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