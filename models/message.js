var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var messageSchema = new Schema({
  messages: [{
    body: { type: String },
    date: { type: Date, default: Date.now }
  }]
});

messageSchema.statics.random = function (cb) {
  this.count(function (err, count) {
    if (err) {
      return cb(err);
    }

    var rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(cb);
  }.bind(this));
};

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;
