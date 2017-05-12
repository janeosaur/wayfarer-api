var mongoose = require("mongoose");
// mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/Wayfarer");

mongoose.Promise = global.Promise;

// exporting a key-value object, with key 'Comments'
module.exports.Comment = require('./comments');
module.exports.City = require('./cities')
