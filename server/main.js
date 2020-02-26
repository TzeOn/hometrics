const express = require("express"),
    bodyParser = require("body-parser"),
    cors = require("cors"); 

const port = process.env.PORT || 5000,
      app = express();

app.listen(port, () => console.log(`Server up and running - listening for requests on port ${port}.`));

app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const user = require("./user");
app.use("/user", user);

const device = require("./device");
app.use("/device", device);

const weather = require("./weather");
app.use("/weather", weather);

const homeSetup = require("./homeSetup");
app.use("/homeSetup", homeSetup);

const deviceManagement = require("./deviceManagement");
app.use("/deviceManagement", deviceManagement);

app.get("/", (request, response) => {
    console.log("Ping!"); 
    response.end("Ping!");
});