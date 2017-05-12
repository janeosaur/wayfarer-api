'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = require('./comments')

var CitySchema = new Schema({
  name: String,
  description: String,
  country: String,
  image: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

// this exports a value, not objectx
module.exports = mongoose.model('City', CitySchema);
