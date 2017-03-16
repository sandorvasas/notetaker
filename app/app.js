import express from 'express';
import chalk from 'chalk';

import api from './api';

var session = require('express-session');
var http = require('http');
var https = require('https');
var io = require('socket.io')(https);
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var fs = require('fs');
var multer = require('multer');


process.on('unhandledRejection', function (reason, p)  {
  console.error(chalk.black.bgRed("Unhandled Rejection at") + ": Promise ", p, " reason: ", reason);
});
process.on('uncaughtException', function (exception)  {
  console.error(chalk.black.bgRed("Unhandled Exception: ",exception, exception.stack));
  if (exception.res) {
      let {err, res} = exception;
      send500(err, res);
  }
});


var app = express();

app.set('env', (process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development') );

console.log("Server running in " + chalk.black.bgGreen(app.get('env').toUpperCase()) +  " environment");

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === "OPTIONS") {
      return res.status(200).end();
  }
  next();
});


if (app.get('env') == 'development') {
  app.locals.pretty = true;
}


app.use('/api', api);


// 404
app.use(function(req, res, next) {
  res.status(404).send('Not found');
});

// 500
app.use((err, req, res, next) => {
  console.error("ERROR: ", err);

  let response = {
      message: "Something went wrong"
  };
  if (app.get('env') !== 'production') {
      response.error = ""  + err;
  }
  res.status(500).json(response); 
});


http.createServer(app).listen(app.get('port'), () => {
  console.info("Server listening on port " + app.get('port'));
});
