'use strict'

//import dependencies
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var controllers = require('./controllers');
var db = require('./models');

// router = express.Router();

//db config
//ADD YOUR INFO HERE!
var dbUser = process.env.MLAB_DBUSER
var dbPassword = process.env.MLAB_DBPASSWORD
var databaseUrl = 'mongodb://' + dbUser + ':' + dbPassword + '@ds137891.mlab.com:37891/wayfarer-api'
mongoose.connect(databaseUrl || 'mongodb://localhost/wayfarer-api')

//config API to use bodyParser and look for JSON in req.body
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

//Prevent CORS errors
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  //Remove caching
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

////////////
// ROUTES //
////////////

app.get('/api', controllers.api.index);
app.get('/api/comments/nuke', controllers.comments.destroyAll);
app.get('/api/comments', controllers.comments.index);
app.post('/api/comments', controllers.comments.create);
app.get('/api/comments/:id', controllers.comments.showOne);
app.delete('/api/comments/:id', controllers.comments.destroy);
app.put('/api/comments/:id', controllers.comments.update);
app.get('/api/cities', controllers.cities.index);
app.get('/api/cities/:name', controllers.cities.showOne);



// get comments from one username
app.get('/api/profile/comments/:name', function(req, res) {
  db.Comment.find({name: req.params.name}, function(err, comments) {
    if (err) {
      res.send(err);
    }
    res.json(comments);
  });
})

// // get specific city info - interferes with /api/cities/:name
// router.route('/api/cities/:id')
//   .get(function(req, res) {
//     db.City.findById(req.params.id, function(err, city) {
//       if (err) {
//         res.send(err);
//       }
//       res.json(city);
//     });
//   })

//start server
app.listen(process.env.PORT || 3000, function() {
  console.log(`api running on port 3000`);
});
