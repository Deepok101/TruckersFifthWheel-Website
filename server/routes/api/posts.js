const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

//Item Model
const Posts = require('../../models/Posts')

//@route GET api/items

router.get('/', (req, res) => {
    Posts.find().sort({date: -1}).then(data => res.json(data))
});

router.post('/', (req, res) => {
    const newPost = new Posts({
        id: req.body.id,
        author: req.body.author,
        text: req.body.text
    });

    newPost.save().then(post => res.json(post))
})


module.exports = router;