var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('chatRoom', { title: 'JusTalk | Chat Room' });
});

router.get('/video', function(req, res, next) {
  res.render('videocall', { title: 'JusTalk | Video-call' });
});

module.exports = router;
