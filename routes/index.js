var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'JusTalk | Login' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'JusTalk | Sign-Up' });
});

module.exports = router;
