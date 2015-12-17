var express = require('express');
var router = express.Router();


router.get('/add', function(req, res) {

  res.render('article/add', { title: 'article add html' });
});

router.post('/add', function (req, res) {
  req.body.user = req.session.user._id;
  new Model('Article')(req.body).save(function(err,article){
    if(err){
      //req.flash('error', 'error!'); //����ʧ����Ϣ
      return res.redirect('/article/add');
    }
    //req.flash('success', 'success!');  //���óɹ���Ϣ
    res.redirect('/');//�������³ɹ��󷵻���ҳ
  });

});

module.exports = router;
