var express = require('express');
var app = express();
var pg = require('pg');

app.use(express.logger());

//app.get('/hello.txt', function(req, res){
//  var body = 'Hello World';
//  res.setHeader('Content-Type', 'text/plain');
//  res.setHeader('Content-Length', body.length);
//  res.end(body);
//});

var conString = "postgres://postgres:postgres@localhost:5432/investor_development";

var client = new pg.Client(conString);

app.get('/', function(req, res) {
  res.send('Hello World');
  //client.connect(function(err) {
  //  if(err) {
  //    return console.error('could not connect to postgres', err);
  //  }
  //  client.query('SELECT NOW() AS "theTime"', function(err, result) {
  //    if(err) {
  //      return console.error('error running query', err);
  //    }
  //    console.log(result.rows[0].theTime);
  //    client.end();
  //  });
  //});
});


pg.connect(process.env.DATABASE_URL || conString, function(err, client) {
  var query = client.query('SELECT id, email FROM users;');

  query.on('row', function(row) {
    console.log(JSON.stringify(row));
  })
})

var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log('Listening on ' + port);
});
