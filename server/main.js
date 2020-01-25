const express = require("express"),
    bodyParser = require("body-parser"),
    session = require("express-session"), 
    cors = require("cors"); 

const port = 3000 || process.env.PORT,
      app = express();

app.listen(port, () => console.log(`Server up and running - listening for requests on port ${port}.`));

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));

app.use(cors()); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const user = require("./user");
app.use("/user", user);

const weather = require("./weather");
app.use("/weather", weather);

const homeSetup = require("./homeSetup");
app.use("/homeSetup", homeSetup);

app.get("/", (request, response) => {
    console.log("Ping!"); 
    response.end("Server is responding.");
});