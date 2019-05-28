const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express()
const session = require('express-session');

const posts = require('./routes/api/posts')
const accounts = require('./routes/api/accounts')
const mongoURI = require('./MongoURI')

const port = process.env.PORT || 5000;

const db = mongoURI;
var loggedIn = false;

mongoose.connect(db).then(() => console.log('Connected to MongoDB')).catch(err => console.log(err))

app.use(express.json());

app.use('/api/posts', posts);
app.use('/api/accounts', accounts);

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

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



app.listen(port, () => console.log('Listening to port 5000'))
