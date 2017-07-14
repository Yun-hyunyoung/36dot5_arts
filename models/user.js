/**
 * Created by ss on 2017-07-06.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artworkSchema = new Schema({
    title: String,
    material: String,
    medium: String,
    width: Number,
    height: Number,
    depth: Number,
    keyword: String,
    image: String,
    description: String,
    price: Number,
    category: String,
    address: String,
    packaging: String,
    sold: {type: Boolean, default: 0},
    regist_date: {type: Date, default: Date.now()}
});

var userSchema = new Schema({
    email: String,
    password: String,
    salt: String,
    nickname: String,
    major: String,
    artworks: [artworkSchema],
    created_date: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('user', userSchema);