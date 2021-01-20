// server.js
// where your node app starts

// init project
var express = require('express');
const moment = require('moment');
// const moment = require('moment');

var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp/:timestamp',(req,res)=>{
  const date = new Date(req.params.timestamp);
  // console.log(typeof date.toString());
  if(date.toString()==='Invalid Date'){
    var utc = moment(parseInt(req.params.timestamp)).format("ddd, DD MMM YYYY hh:mm:ss");
    utc +=" GMT";
    var unix = parseInt(moment(parseInt(req.params.timestamp)).format("x"));
  }else{
    var utc = moment(date).format("ddd, DD MMM YYYY hh:mm:ss");
    utc +=" GMT";
    var unix = parseInt(moment(date).format("x"));
  }
  // if(moment(req.params.timestamp, "YYYY-MM-DD",true).isValid() ){
  //   var utc = moment(req.params.timestamp).utc('GMT').format("ddd, DD MMM YYYY mm:ss:SS");
  //   utc +=" GMT";
  //   var unix = parseInt(moment(req.params.timestamp).format("x"));
  // }else{
  //   // res.send(parseInt(req.params.timestamp));
  //   var utc = moment(parseInt(req.params.timestamp)).format("ddd, DD MMM YYYY mm:ss:SS");
  //   utc +=" GMT";
  //   var unix = parseInt(moment(parseInt(req.params.timestamp)).format("x"));
  // }
  res.json({
    unix,
    utc
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT||5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
