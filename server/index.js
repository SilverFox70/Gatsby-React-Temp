// Uncomment line below to read from local .env for
// local testing and development
// require("dotenv").config();
const compression = require("compression");
const express = require("express");
const basicAuth = require("express-basic-auth");
const subdomain = require("express-subdomain");
const cors = require("cors");
//const auth = require('./auth');
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const fs = require("fs");
const https = require("https");

const app = express();
const env = process.env.NODE_ENV || "dev";
const port = process.env.PORT || 8080;

// Enable CORS to allow deploy posts
app.use(cors());

app.use(cookieParser());

app.use(
  session({
    resave: "true",
    saveUninitialized: "true",
    secret: "keyboard cat"
  })
);

app.use(compression());

app.enable("trust proxy");

app.use(express.static("./public"));

app.use(function(req, res) {
  res.status(400);
  res.redirect("/404.html");
});

app.listen(port, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`App and API is live at http://localhost:${port}`);
});
