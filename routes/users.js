var express = require('express');
var router = express.Router();
require('../db');
function md5(val){
  return require('crypto').createHash('md5').update(val).digest('hex');
}

/* GET users listing. */
router.get('/reg', function(req, res) {

  res.render('users/reg', { title: 'user reg 0' });
});

/**
 * ����д�û�ע����Ϣ�ύʱ�Ĵ���
 */
router.post('/reg', function (req, res) {
  //���� POST ������Ϣ��������Ķ�����������Ҫ���� POST ���ı��ڵ� name="username" ���ֵ��ֻ����� req.body['username'] �� req.body.username ���ɡ�
  var user = req.body;//
  if(user.password != user.repassword){
    req.flash('error','������������벻һ��');
    return res.redirect('/users/reg');
  }
  delete user.repassword; //����repassword����Ҫ���棬���Կ���ɾ��
  user.password = md5(user.password); //���������md5����
  user.avatar = "https://secure.gravatar.com/avatar/"+md5(user.email)+"?s=48"; //�õ��û���ͷ��

  new Model('User')(user).save(function(err,user){
    if(err){
      req.flash('error',err);
      return res.redirect('/users/reg');
    }
    console.log(user);
    req.session.user = user;//�û���Ϣ���� session
    res.redirect('/');//ע��ɹ��󷵻���ҳ
  });
});


router.get('/login', function(req, res) {

  res.render('users/login', { title: 'login' });
});

router.post('/login', function (req, res) {
  var user = req.body;
  user.password = md5(user.password);

  Model('User').findOne(user,function(err,user){
    if(err){
      req.flash('error',err);
      return res.redirect('/users/login');
    }

    if(user){  //�ҵ�����
      req.session.user = user;//�û���Ϣ���� session
      res.redirect('/');//ע��ɹ��󷵻���ҳ
    }else{
      return res.redirect('/users/login');
    }

  });
});

router.get('/logout', function (req, res) {
  req.session.user = null;//�û���Ϣ���� session

  res.redirect('/');//ע��ɹ��󷵻���ҳ
});

module.exports = router;
