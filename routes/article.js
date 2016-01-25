var express = require('express');
var router = express.Router();
var markdown = require('markdown').markdown;

router.get('/add', function(req, res) {

  res.render('article/add', { title: 'article add html' });
});

router.post('/add', function (req, res) {
  req.body.user = req.session.user._id;
  new Model('Article')(req.body).save(function(err,article){
    if(err){
      //req.flash('error', 'error!'); //放置失败信息
      return res.redirect('/article/add');
    }
    //req.flash('success', 'success!');  //放置成功信息
    res.redirect('/');//发表文章成功后返回主页
  })
});

router.get('/detail/:_id', function (req, res) {
  console.log(req.params._id);
  Model('Article').findOne({_id:req.params._id},function(err,article){
    article.content = markdown.toHTML(article.content);
    res.render('article/detail',{title:'查看文章',article:article});
  });
});

module.exports = router;