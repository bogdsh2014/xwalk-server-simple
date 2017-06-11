var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

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

app.get('/test', function(req, res) {
    var headers = req.headers;
    console.log(JSON.stringify(headers));
    res.send(headers);
});

app.get('/apk', function(req, res) {
    if(req.query.arch.indexOf('arm64') >=0 ) {
        res.download('XWalkRuntimeLib-arm64.apk', 'xwalk.apk', function (err) {
            console.log(err);
        });
    } else if(res.query.arch.indexOf('arm') >=0 ) {
        res.download('XWalkRuntimeLib-arm32.apk', 'xwalk.apk', function (err) {
            console.log(err);
        });
    } else {
        //test intel version later
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
