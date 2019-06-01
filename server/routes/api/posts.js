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

router.post('/like', (req, res)=>{
    var id = req.body.id;
    Posts.updateOne({_id: id}, {$inc: {likes: 1} }, (err, res)=>{
        if (err){
            console.log(err)
        }
    })
});

router.post('/comment', (req, res)=>{
    var id = req.body.id;
    var user = req.body.user;
    var text = req.body.comment;

    var comment = {
        user: user,
        text: text
    }
    Posts.updateOne({_id: id}, {$push: {comments: comment}} , (err, res)=>{
        if (err){
            console.log(err)
        }
    })
});



module.exports = router;