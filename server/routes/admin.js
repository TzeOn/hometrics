const express = require("express");
const router = express.Router();
const database = require("./database");

router.post("/getUsers", (request, response) => {
    let users = database.query(`select forename, surname, type, emailAddress from user where hub = (select hub from user where emailAddress = "${request.body.emailAddress}") and not emailAddress = "${request.body.emailAddress}"`);
    response.json({"users": users});
    
});

router.post("/deleteUser", (request, response) => {
    let emailAddress = request.body.emailAddress;
    let sql = `DELETE FROM deviceActivity WHERE user = "${request.body.emailAddress}"`;
    database.query(sql);
    sql = `delete from deviceRestriction where restrictor = "${emailAddress}" or restricted = "${emailAddress}"`;
    database.query(sql);
    sql = `delete from user where emailAddress = "${emailAddress}"`;
    database.query(sql);
    response.json({"ok": true});
});

router.post("/getPendingUsers", (request, response) => {
    let users = database.query(`select forename, surname, dob, emailAddress from user where hub = (select hub from user where emailAddress = "${request.body.emailAddress}") and not emailAddress = "${request.body.emailAddress}" and approved=0`);
    response.json({"users": users});

});

router.post("/approveUser", (request, response) => {
    database.query(`update user set approved = 1 where emailAddress = "${request.body.emailAddress}"`);
    response.json({"ok": true});

});

router.post("/changeUser", (request, response) => {
    database.query(`update user set type = "${request.body.type}" where emailAddress = "${request.body.emailAddress}"`);
    response.json({"ok": database.query(`select emailAddress, type from user where emailAddress = "${request.body.emailAddress}"`)});

});

module.exports = router;