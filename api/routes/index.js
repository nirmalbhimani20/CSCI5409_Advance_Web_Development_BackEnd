const express = require('express');
var app = express()
const signupRoute = require('./user/signup');
const expertRoute = require('./expert/expert');
const studentRoute = require('./student/student');

app.use('/user',signupRoute);
app.use('/expert', expertRoute);
app.use('/student',studentRoute)

module.exports = app;