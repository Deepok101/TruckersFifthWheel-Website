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
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now 
    },
    comments:[{
        user:{
            type: String,
            required: false
        },
        date: {
            type: Date,
            default: Date.now
        },
        text:{
            type: String,
            required: false
        }
    }]
});

module.exports = Posts = mongoose.model('posts', PostsSchema)