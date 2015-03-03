var db = require('../config');
var Link = require('./link');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

var User = db.Model.extend({
  tableName: 'users',
  urls: function() {
    return this.hasMany(Link);
  },
  initialize: function(){
    this.on('creating', function(model){
      var password = model.get('password');
      model.unset('password');
      bcrypt.hash(password, null, null).then(function(err, hash){
        if (err) {
          console.log('Somthing went wrong in hashing the password', err);
        } else {
          model.set('hash', hash);
        }
      });
    });
  },
});

module.exports = User;
