const express = require("express"),
    database = require("./database"),
    bodyParser = require("body-parser");

const port = 8080 || process.env.PORT,
      app = express();

app.listen(port, () => console.log(`Server up and running - listening for requests on port ${port}.`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const user = require("./user");
app.use("/user", user);