var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = requite('mongoose');

var userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passsword: String,
});

userSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
    });
});

userSchema.method('comparePassword', function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if (err) {
      callback(err);
    } else {
    callback(null, isMatch);
    }
  });
});

var User = mongoose.model('User', userSchema);

module.exports = User;
