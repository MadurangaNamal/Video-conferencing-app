var express = require('express');
var router = express.Router();
var io = require('socket.io');
var randomstring = require("randomstring");

const rooms = {}
/*router.get('/', function(req, res, next) {
    res.render('chatRoom', { title: 'JusTalk | Chat Room', rooms: rooms });
});*/

router.get('/:room', (req , res ) =>{
  if(rooms[req.params.room] == null){
  //  return res.redirect('/users');
  }
  else{
    res.render('chatRoom', {roomName: req.params.room})
  }

});

router.post('/room', (req , res )=>{
  if(rooms[req.body.room] != null){
   // return res.redirect('/')
  }
    rooms[req.body.room] = { users: {} } 
    res.redirect(req.body.room) 
});

router.get('/video', function(req, res, next) {
  res.render('videocall', { title: 'JusTalk | Video-call' });
});

module.exports = router;
module.exports.rooms = rooms;
