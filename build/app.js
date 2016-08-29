var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var ejs = require('ejs');
var bodyParser = require('body-parser');

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.app.port

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.engine('.html', ejs.__express);
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/',function(req,res){
	res.render('../dist/index.html')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
