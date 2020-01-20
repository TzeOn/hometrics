const express = require("express"),
    bodyParser = require("body-parser"),
    session = require("express-session");

const port = 8080 || process.env.PORT,
      app = express();

app.listen(port, () => console.log(`Server up and running - listening for requests on port ${port}.`));

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const user = require("./user");
app.use("/user", user);

const weather = require("./weather");
app.use("/weather", weather);

const homeSetup = require("./homeSetup");
app.use("/homeSetup", homeSetup);