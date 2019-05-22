const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostsSchema = new Schema({
    id: {
        type: Number,
        required: true,
        index: true
    },
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    likes: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now 
    }
});

module.exports = Posts = mongoose.model('posts', PostsSchema)