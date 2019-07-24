const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express()

const session = require('express-session');
const posts = require('./routes/api/posts')
const accounts = require('./routes/api/accounts')
const chat = require('./routes/api/chat')
const jobs = require('./routes/api/jobs')
const url = require('./routes/api/url')
const weather = require('./routes/api/weather')
const roadalert = require('./routes/api/roadalert')

const mongoURI = require('./MongoURI')

const port = process.env.PORT || 5000;

var server = app.listen(port, () => console.log('Listening to port 5000'))

const io =  require('socket.io').listen(server);
const db = mongoURI;

mongoose.connect(db).then(() => console.log('Connected to MongoDB')).catch(err => console.log(err))

app.use(express.json());

app.use('/api/posts', posts);
app.use('/api/accounts', accounts);
app.use('/api/chat', chat);
app.use('/api/jobs', jobs)
app.use('/api/url', url)
app.use('/api/weather', weather)
app.use('/api/roadalert', roadalert)


var urlencodedParser = express.urlencoded({extended: false});

if (process.env.NODE_ENV == "production"){
    app.use(express.static('../build'))
}

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }     
  })  
})

app.get('/home', (req, res) => {
  res.redirect('/');
})







//Socket.io Real Time Chat and Comment System
const Chat = require('./models/Chat')
const Posts = require('./models/Posts')
io.set('transports', ['websocket']);

io.on('connection', (socket)=>{
  socket.on('send message', (sent_msg, user)=>{
    io.sockets.emit('message', `${sent_msg} by ${user}`);
    const newChat = new Chat({
      author: user,
      text: sent_msg
    });
    newChat.save();
  })

  socket.on('send comment', (comment, user, userID, id)=>{
    io.sockets.emit('comment', {id: id, user: user, msg:`${comment}`});

    var comment = {
        user: user,
        userID: userID,
        text: comment
    }
    Posts.updateOne({_id: id}, {$push: {comments: comment}} , (err, res)=>{
        if (err){
            console.log(err)
        }
    })
  })
  socket.on('send like', (id, user)=>{
    io.sockets.emit('like', ({id:id, user:user}));
    Posts.updateOne({_id: id, likedByAcc: {$nin: [user]}}, {$inc: {likes: 1}, $push: {likedByAcc: user} }, (err, res)=>{
      if (err){
          console.log(err)
      }
  })
  })

  socket.on('remove like', (id, user)=>{
    io.sockets.emit('unlike', ({id:id, user:user}));
    Posts.updateOne({_id: id, likedByAcc: {$in: [user]}}, {$inc: {likes: -1}, $pull: {likedByAcc: user} }, (err, res)=>{
      if (err){
          console.log(err)
      }
  })
  })


  socket.on('send friend request', (userID, username, otherUsername, otherUserID) => {
    var request = {
        requesterUserID: userID,
        userID: otherUserID,
        username: otherUsername,
        statusNumber: 1

    }
    var request2 = {
      userID: userID,
      requesterUserID: otherUserID,
      username: username,
      statusNumber: 2

    }
    Accounts.updateOne({_id: userID}, {$push: {'profile.connections.friendList': request} }, (err, res)=>{
        if (err){
            console.log(err)
        }
    })
    Accounts.updateOne({_id: otherUserID}, {$push: {'profile.connections.friendList': request2} }, (err, res)=>{
      if (err){
          console.log(err)
      }
  })
  })

  socket.on('accept friend request', (userID, username, otherUsername, otherUserID)=>{
    var request2 = {
      userID: otherUserID,
      username: otherUsername

    }

    Accounts.updateOne({_id: userID, 'profile.connections.receivedRequests': {$elemMatch:{userID: otherUserID}}}, {$push: {'profile.connections.friends': request2} }, (err, res)=>{
      if (err){
          console.log(err)
      }
  })
  })
})


