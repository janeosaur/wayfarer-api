var db = require('../models');

// GET '/api/comments/nuke'
function destroyAll(req,res){
  db.Comment.remove(function(err, success) {
    if (err) { res.send(err) };
    res.json({message: 'all comments have been deleted'});
  });
};

// GET '/api/comments'
function index(req,res) {
  db.Comment.find(function(err, comments) {
    if (err) { res.send(err) };
    res.json(comments);
  });
};

// POST '/api/comments'
function create(req,res) {
  var post = new db.Comment();
  post.name = req.body.name;
  post.title = req.body.title;
  post.text = req.body.text;
  post.city = req.body.city;
  post.date = Date.now();
  post.save();
  db.City.findOne({name: post.city}, function(err, foundCity) {
    if (err) { res.send(err) };
    foundCity.comments.push(post._id);
    foundCity.save();
    res.json(foundCity);
  });
};

// GET 'api/comments/:id'
function showOne(req,res) {
  db.Comment.findById(req.params.id, function(err, comment) {
    if (err) { res.send(err) };
    res.json(comment);
  });
};

// DELETE '/api/comments/:id'
function destroy(req,res) {
  db.Comment.remove({_id:req.params.id}, function(err, comment) {
    if (err) { res.send(err) };
    res.json({message: 'comment has been deleted'})
  });
};

// UPDATE '/api/comments/:id'
function update(req, res) {
  db.Comment.findById(req.params.id, function(err, comment) {
    if (err) { res.send(err) };
    (req.body.name) ? comment.name = req.body.name : null;
    (req.body.title) ? comment.title = req.body.title : null;
    (req.body.text) ? comment.text = req.body.text : null;
    (req.body.date) ? comment.date = req.body.date : null;
    comment.save(function(err) {
      if (err) { res.send(err) }
      res.json({message: 'comment has been updated'})
    });
  });
};

module.exports = {
  index: index,
  create: create,
  showOne: showOne,
  destroyAll: destroyAll,
  destroy: destroy,
  update: update
}
