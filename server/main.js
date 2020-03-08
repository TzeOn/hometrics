const express = require("express"),
    bodyParser = require("body-parser"),
    cors = require("cors"); 

const port = process.env.PORT || 5000,
      app = express();

app.listen(port, () => console.log(`Server up and running - listening for requests on port ${port}.`));

app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const user = require("./routes/user");
app.use("/user", user);

const device = require("./routes/device");
app.use("/device", device);

const weather = require("./routes/weather");
app.use("/weather", weather);

const homeSetup = require("./routes/homeSetup");
app.use("/homeSetup", homeSetup);

const deviceManagement = require("./routes/deviceManagement");
app.use("/deviceManagement", deviceManagement);

const comfort = require("./routes/comfort");
app.use("/comfort", comfort);

const admin = require("./routes/admin");
app.use("/admin", admin);

app.get("/", (request, response) => {
    response.send("Ping!");
    console.log("Ping!");
});