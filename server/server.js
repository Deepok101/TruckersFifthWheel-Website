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

if (process.env.NODE_ENV == "production"){
    app.use(express.static("../"))
}




app.listen(port, () => console.log('Listening to port 5000'))
