var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    'firstname': String,
    'lastname': String,
    'address': String,
    'city': String,
    'state': String,
    'phone': String,
    'mobilephone': String,
    'email': String,
    'password': String
})

module.exports = mongoose.model('User', userSchema);