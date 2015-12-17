var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.session.user)
  Model('Article').find({}).populate('user').exec(function(err,article){
    res.render('index', {title: 'home',articles:article});
  });
});


module.exports = router;