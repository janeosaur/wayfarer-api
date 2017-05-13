var db = require('../models');

// GET '/api/cities'
function index(req, res) {
  db.City.find({})
  .populate('comments')
  .exec(function(err, cities) {
    if (err) { res.send(err) };
    res.json(cities);
  });
};

// GET '/api/cities/:name'
function showOne(req,res) {
  db.City.findOne({name: req.params.name})
  .populate('comments')
  .exec(function(err, city) {
    if (err) { res.send(err) };
    res.json(city);
  });
};

module.exports = {
  index: index,
  showOne: showOne
}
