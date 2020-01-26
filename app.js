var express = require('express');
var bodyParser = require('body-parser');
var Firebase = require('firebase');
var session = require('express-session');
const app = express();
var rmservice = require('./routes/roomservice')


users = [];
connections = [];
const rooms = rmservice.rooms;


app.use(function(req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Max-Age", "3600");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});

Firebase.initializeApp({
  apiKey: "AIzaSyB9QNej7zblgWPhaAuev9eTMqrpoah_Uu4",
  authDomain: "chat-app-9f4b6.firebaseapp.com",
  databaseURL: "https://chat-app-9f4b6.firebaseio.com",
  projectId: "chat-app-9f4b6",
  storageBucket: "chat-app-9f4b6.appspot.com",
  messagingSenderId: "1037961971849",
  appId: "1:1037961971849:web:7e7b69a5d84104b443de58",
  measurementId: "G-MDY2486G54"

});

var db = Firebase.database();
var usersRef = db.ref("users");

var port = process.env.PORT || 3000;
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var roomserviceRouter = require('./routes/roomservice');


var http = require('http').createServer(app);
var io = require('socket.io')(http);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: 'true' }));
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                    
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

app.use(cookieParser());
app.use(session({secret:"madur", resave:false, saveUninitialized:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chatRoom', roomserviceRouter);


app.post('/users/add', function(req, res){

  var data = {
    "Email":req.body.email,
    "UserName":req.body.username
  };
  usersRef.push(data, function(err) {
    if (err) {
      res.send(err)
    } else {

    }
  });
});

io.sockets.on('connection', function(socket){
  connections.push(socket);
  console.log('Conneted : %s sockets connected', connections.length);

  socket.on('disconnect', function(data){
    
      users.splice(users.indexOf(socket.username), 1);
      updateUsers();
      connections.splice(connections.indexOf(socket), 1);
      
  console.log('Disconneted : %s sockets connected', connections.length);
});

 
//app users
  socket.on('new user', function(data, callback){
      callback(true);
      socket.username = data;
      users.push(socket.username);
      updateUsers();
  });

  function updateUsers(){
      io.sockets.emit('get users', users);
  };

  //room
   socket.on('newchatusers',function(data) {
   
    socket.join(data.room)
    rooms[data.room].users[socket.id] = data.name
   
       console.log(rooms);
      // updatechatUsers(rooms[data.room].users);
      socket.to(data.room).emit('get chat users', {chatuser :rooms[data.room].users[socket.id]} );
 });





  });

//setting port
http.listen(port, function(){
  console.log('listening on *:'+port);
});

module.exports = app;

