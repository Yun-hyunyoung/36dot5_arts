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
    Depth: Number,
    keyword: String,
    image: String,
    description: String,
    price: Number,
    category: String,
    address: String,
    packing: String,
    sold: Boolean,
    regist_date: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('artwork', artworkSchema);