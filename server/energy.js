const express = require("express"),
      router = express.Router(),
      database = require("./database");

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

router.post("/scoreboard", (request, response) => {

    let sql = `SELECT * from `

});



router.post("/personal", (request, response) => {
    let sql = `SELECT * FROM deviceActivity WHERE user="${request.emailAddress}"`;
    let oh = database.query(sql);

    response.json({"j":oh});

});

module.exports = router;