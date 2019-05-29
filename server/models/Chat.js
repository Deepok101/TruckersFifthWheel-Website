const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    author: {
        type: String,
        default: "Anonymous im gay",
        required: false

    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now 
    }
});

module.exports = Chat = mongoose.model('chat', MessageSchema)