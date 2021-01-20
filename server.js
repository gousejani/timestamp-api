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

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

app.get('/api/timestamp/:timestamp',(req,res)=>{
  if(/\d{5,}/.test(req.params.timestamp)){
    var utc = moment.utc(parseInt(req.params.timestamp)).format("ddd, DD MMM YYYY HH:mm:ss");
    utc +=" GMT";
    var unix = parseInt(moment.utc(parseInt(req.params.timestamp)).format("x"));
  }else{
    const date = new Date(req.params.timestamp);
    // console.log(typeof date.toString());
    if(date.toString()==='Invalid Date'){
      res.json({ error: "Invalid Date" });
    }else{
      var utc = moment.utc(date).format("ddd, DD MMM YYYY HH:mm:ss");
      utc +=" GMT";
      var unix = parseInt(moment.utc(date).format("x"));
    }
  }
  res.json({
    unix,
    utc
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT||5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
