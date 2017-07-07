/**
 * Created by ss on 2017-07-06.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: String,
    password: String,
    salt: String,
    type: String,
    major: String,
    created_date: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('user', userSchema);