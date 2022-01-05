var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
const cors = require ('cors');


dotenv.config();


//Rutas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


//CORS POLICY
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/users', usersRouter);

console.log("BACK")
module.exports = app;
