const express = require("express"),
      router = express.Router(),
      database = require("./database");


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



router.post("/totalUserEnergy", (request, response) => {
    let user = request.body.id;
    let sql = `SELECT SUM(Energy) FROM deviceActivity WHERE user = "${user}"`;
    let energy = database.query(sql);

    if(energy == 1){
        response.json({"message": "ok"});
    }else{
        response.json({"message": "error"});
    }
});


router.post("/totalHomeEnergy", (request, response) => {
    let sql = `SELECT SUM(ENERGY) FROM deviceActivity`;
    let energy = database.query(sql);

    if(energy == 1){
        response.json({"message": "ok"});
    }else{
        response.json({"message": "error"});
    }
});


router.post("/scoreboard", (request, response) => {

    let sql = `SELECT * from `

});



router.post("/personalBreakdown", (request, response) => {
    let user = request.body.id;
    let sql = `SELECT * FROM deviceActivity WHERE user="${user}"`;
    let breakdown = database.query(sql);
    console.log(breakdown);
    response.json({"j":"test"});

});

module.exports = router;