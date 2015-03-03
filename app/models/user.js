var db = require('../config');
var Link = require('./link');

var User = db.Model.extend({
  tableName: 'users',
  urls: function() {
    return this.hasMany(Link);
  }
});

module.exports = User;
