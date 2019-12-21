var express = require('express');
var router = express.Router();
var Firebase = require('firebase');



var email;


/* GET online users listing. */
router.post('/', function(req, res, next) {
  var name;
  email = req.body.email;

  var db = Firebase.database();
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
    
  res.render('users', { title: 'JusTalk | Users', name: name ,rooms:rooms});

 
 
});


module.exports = router;
