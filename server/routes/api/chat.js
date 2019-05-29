const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const session = require('express-session');
const mongoURI = require('../../MongoURI')

//Item Model
const Chat = require('../../models/Chat')

router.get('/', (req, res)=>{
    Chat.find().then(data => res.json(data));
})

module.exports = router;