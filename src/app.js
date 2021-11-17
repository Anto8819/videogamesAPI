const express = require("express"); //import express
const cookieParser = require("cookie-parser");
// const bodyParser = require('body-parser');
const morgan = require("morgan"); //import middleware morgan for console logging
const routes = require("./routes/index.js"); //import middleware for routing
const cors = require("cors"); //import hook for granting frontend access, which is running in port3000 != server's port 3001

require("./db.js"); //import db creates in sequelice

const server = express(); //express is a funcion so we need to call it into a variable to use it

server.set("PORT", process.env.PORT || 3001);

server.name = "API";

server.use(express.urlencoded({ extended: true, limit: "50mb" })); //change bodyParser to express
server.use(express.json({ limit: "50mb" })); //change bodyParser to express
server.use(cookieParser());
server.use(morgan("dev"));
// server.use(cors({
//   origin: 'http://yourapp.com'
// }))
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from (updated)
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

//simple route for testing
//server.get("/", (req, res) => {
//   res.json({ message: "Welcome to Antonella application." });
// });

module.exports = server;
