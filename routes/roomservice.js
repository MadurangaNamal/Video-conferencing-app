var express = require('express');
const { static } = require('express');
var router = express.Router();


const rooms = {}

router.get('/:room', (req , res ) =>{
  if(rooms[req.params.room] == null){
  //  return res.redirect('/users');
  }
  else{
    //console.log(rooms);
    res.render('chatRoom', {roomName: req.params.room})
  }

});

router.post('/room', (req , res )=>{
  if(rooms[req.body.room] != null){
   // return res.redirect('/')
  }
    rooms[req.body.room] = { users: {} } 
    //console.log(rooms);
    res.redirect(req.body.room) 
});

/*
router.get('/video', function(req, res, next) {
  res.render('videocall', { title: 'JusTalk | Video-call' });
});*/

module.exports = router;
module.exports.rooms = rooms;
