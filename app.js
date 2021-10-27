const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
var multer = require('multer')
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
const rootRoute = "/api";

app.get("/", (req, res) => {
    res.json({ message: "Welcome to CSCI-5709-Group15 Backend  " });
});

const signupRoute = require('./api/routes/signup');
const loginRoute = require('./api/routes/login');
const testRoute = require('./api/routes/test');
const myprofileRoute = require('./api/routes/profile');

app.use(rootRoute,signupRoute);
app.use(rootRoute,loginRoute);
app.use(rootRoute,testRoute);
app.use(rootRoute,myprofileRoute);
app.use(express.static('uploads'));
const path = require('path');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept ,  Accept, Accept-Language,  User-Agent"
  );
  res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');

  next();
});

app.get("/", (req, res) => {

  res.json({ message: "Welcome to CSCI-5709-Group15 Backend  " });
});


const routes = require('./api/routes/index');

app.use(rootRoute, routes);

app.use(express.static(path.join(__dirname+'/public')));

module.exports = app;