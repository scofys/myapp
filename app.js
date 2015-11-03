var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var fs = require('fs');
var mysql = require('mysql');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

var data = 'Some data I want to write to a file';
fs.writeFile('public/file.txt', data, function(err) {
    if(!err) {
        console.log('Wrote data to file.txt');
    }else {
        throw err;
    }
});
fs.readFile('file.txt', 'utf8', function(err, data) {
    if(!err) {
        console.log(data);
    }else {
        throw err;
    }
});

var connection = mysql.createConnection({
  host     : '192.168.11.88',
  user     : 'root',
  password : '123456',
  database : 'shijiahui'
});

connection.connect();

connection.query('SELECT * from GRADE', function(err, rows, fields) {
    if(!err) {
        console.log('The solution is: ', rows);
        console.log('The solution is: ', rows[0]);
        console.log('The solution is: ', rows[0].LOW);
    }else {
        console.log('Error while performing Query');
    }
});

connection.end();

//export SECRET_KEY='51saf8aw7fa51asd2a3w5';

console.log(process.env.SECRET_KEY);


module.exports = app;
