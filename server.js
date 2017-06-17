var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var AWS = require('aws-sdk');

AWS.config.loadFromPath('./config.json');

var lexruntime = new AWS.LexRuntime({apiVersion: '2016-11-28'});

var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var app = express();


app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

app.post('/test', function(req, res) {
    var msg = req.body.msg;

    var params = {
      botAlias: '$LATEST', /* required, has to be '$LATEST' */
      botName: 'BookConferenceRoom', /* required, the name of you bot */
      inputText: msg, /* required, your text */
      userId: 'sivaram', /* required, arbitrary identifier */
      sessionAttributes: {
        someKey: 'testKey'
      }
    };

    lexruntime.postText(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      }
      else{
      	console.log(data);
      }
    });
    res.end();
});
// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
