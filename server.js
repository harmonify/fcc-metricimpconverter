"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const expect = require("chai").expect;
const cors = require("cors");
require("dotenv").config();

const apiRoutes = require("./routes/api.js");
const fccTestingRoutes = require("./routes/fcctesting.js");
const runner = require("./test-runner");
const { errorHandler } = require("./middlewares");

// initialize app
let app = express();

// middlewares
app.use("/public", express.static(process.cwd() + "/public"));
app.use(cors({ origin: "*" })); //For FCC testing purposes only
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
// Index page (static HTML)
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// For FCC testing purposes
fccTestingRoutes(app);

// Routing for API
apiRoutes(app);

// 404 Not Found
app.use(function (req, res, next) {
  res.status(404).type("text").send("Not Found");
});

// Error Handler
app.use(errorHandler);

// listener
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Listening on port " + port);
  if (process.env.NODE_ENV === "test") {
    console.log("Running Tests...");
    setTimeout(function () {
      try {
        runner.run();
      } catch (e) {
        console.log("Tests are not valid:");
        console.error(e);
      }
    }, 1500);
  }
});

module.exports = app; //for testing
