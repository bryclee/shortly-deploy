// var Bookshelf = require('bookshelf');
var path = require('path');
var mongoose = require('mongoose');
var key = require('../db/mongooseLink.js').key;
mongoose.connect(key);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('Mongoose db open');
});

module.exports = db;
