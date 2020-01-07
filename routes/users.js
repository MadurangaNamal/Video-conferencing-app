var express = require('express');
var router = express.Router();
var Firebase = require('firebase');
var session = require('express-session');
var roomservie = require('./roomservice');

var email;



/* GET online users listing. */
router.post('/', function(req, res, next) {
  var name;
  var db = Firebase.database();
 
  email = req.body.email;
console.log(email);

  
  var ref = db.ref("users");

  ref.on('value', gotData, errData);

function gotData(data){
  //console.log(data.val());
    var data=data.val();
    var keys = Object.keys(data);
  
    for(var i=0; i< keys.length; i++) {
      var k = keys[i];
      var mail= data[k].Email;
      var uname = data[k].UserName;
  
      
      var n = email.localeCompare(mail);
      if(n==0){
        name = uname;
       
      }
    }
  }
  function errData(err){
    console.log('Error!!');
    console.log(err);
  }

    console.log(name);
  
    var rooms = roomservie.rooms;
    if(name){

      res.render('users', { 
        title: 'JusTalk | Users',
        name: name,
        rooms :rooms
     } );
    }
    
  
 
 
});
/*router.get('/', function(req, res, next) {
  var name = session.name;
  res.render('users', { title: 'JusTalk | Users', name:name });
});*/



module.exports = router;
