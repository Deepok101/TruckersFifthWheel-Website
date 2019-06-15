const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

//Item Model
const Posts = require('../../models/Posts')

//@route GET api/items

router.get('/', (req, res) => {
    Posts.find().sort({date: -1}).then(data => res.json(data))
});

router.get('/:user', (req, res) => {
    var id = req.params.user;
    Posts.find({authorID: mongoose.Types.ObjectId(id)}).sort({date: -1}).then(data => res.json(data))
});




router.post('/', (req, res) => {
    const newPost = new Posts({
        id: req.body.id,
        author: req.body.author,
        authorID: req.body.authorID,
        text: req.body.text,
        url: req.body.url,
        urlTitle: req.body.urlTitle,
        urlDescription: req.body.urlDescription,
        urlImg: req.body.urlImg,
        image: req.body.image

    });

    newPost.save().then(post => res.json(post))
})

router.post('/delete', (req, res)=>{
    var id = req.body.id;
    Posts.deleteOne({_id: id}, (err, res)=> {
        if (err){
            console.log(err)
        }
    })
})

router.post('/like', (req, res)=>{
    var id = req.body.id;
    var user = req.body.user;
    Posts.updateOne({_id: id, likedByAcc: {$nin: [user]}}, {$inc: {likes: 1}, $push: {likedByAcc: user} }, (err, res)=>{
        if (err){
            console.log(err)
        }
    })
});

router.post('/like/cancel', (req, res)=>{
    var id = req.body.id;
    var user = req.body.user;
    Posts.updateOne({_id: id, likedByAcc: {$in: [user]}}, {$inc: {likes: -1}, $pull: {likedByAcc: user} }, (err, res)=>{
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