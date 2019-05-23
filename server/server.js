const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express()

const posts = require('./routes/api/posts')
const mongoURI = 'mongodb+srv://deepok:deepu7700@deepakcluster-eiyyp.mongodb.net/test?retryWrites=true'
const port = 5000;


app.use(express.json());

const db = mongoURI;

mongoose.connect(db).then(() => console.log('Connected to MongoDB')).catch(err => console.log(err))

app.use('/api/posts', posts);
app.use(express.static(path.join(__dirname, '../public')));


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

app.listen(port, () => console.log('Listening to port 5000'))
