/**
 * Require statements
 */
require('dotenv').load();
const createError = require('http-errors');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./routes/config/passport');
const path = require('path');
const mongoose = require('mongoose');
const Router = express.Router();
const Employee = require("./models/employee.js");
let empRoutes = require("./routes/employee-routes.js");

/**
 * App configurations
 */
let app = express();
app.use('/api/', empRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

/**
 * Variables
 */
const port = 4200; // server port

// conncection string
var conn = "mongodb+srv://admin:Piplup893@buwebdev-cluster-1.8auop.mongodb.net/web450?retryWrites=true&w=majority";

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.debug(`Connection to the database instance was successful!!!!`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * API(s) go here
 */


/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
