const express = require("express"),
      router = express.Router(),
      database = require("./database"),
      nodemailer = require("nodemailer");

router.post("/signup", (request, response) => {
    let user = request.body,
        reply = {
            forename: true,
            surname: true,
            dob: true,
            emailAddress: true,
            password: true,
            hub: true
        };

    // Validate forename.
    let regex = /^[a-zA-Z ]{2,30}$/;
    if (!(regex.test(user.forename)))
        reply.forename = false;

    // Validate surname.
    if (!(regex.test(user.surname)))
        reply.forename = false;

    // Validate email address.
    regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!(regex.test(user.emailAddress)))
        reply.emailAddress = false;
    let sql = `SELECT * FROM user WHERE emailAddress="${user.emailAddress}"`;
    if (database.query(sql).length !== 0)
        reply.emailAddress = false;
    
    // Validate hub credentials.
    sql = `SELECT * FROM hub WHERE id="${user.hubName}" AND password="${user.hubPassword}"`;
    if (database.query(sql).length === 0) {
        reply.hub = false;
        console.log(database.query(sql));
    }

    if (reply.dob === true && reply.emailAddress === true && reply.forename === true && reply.surname === true && reply.hub === true && reply.password === true) {
        // Generate random user confirmation code. 
        let confirmationCode = Math.floor(Math.pow(10, 3) + Math.random() * 9 * Math.pow(10, 3)); 

        // Insert user credentials into database. 
        sql = `INSERT INTO user (forename, surname, dob, emailAddress, password, hub, confirmationCode) VALUES ("${user.forename}", "${user.surname}", DATE "${user.dob}", "${user.emailAddress}", "${user.password}", "${user.hubName}", "${confirmationCode}")`
        database.query(sql);

        // Send confirmation code to user's email address.
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "hometrics.donotreply@gmail.com",
                pass: "hometrics123"
            }
        });

        const mailOptions = {
            from: "hometrics.donotreply@gmail.com",
            to: user.emailAddress,
            subject: "Your Confirmation Code",
            text: `Your confirmation code is ${confirmationCode}.`
        };
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) 
              console.error("Accepted an invalid email address."); 
            else 
              console.log(`Confirmation code emailed to ${user.emailAddress}.`);
        });
        response.end("ok"); 
        console.log(`Signed up ${user.emailAddress} as a user.`); 
    } else {
        response.json(reply); 
        console.log("Rejected a sign-up request."); 
    }
});

module.exports = router;