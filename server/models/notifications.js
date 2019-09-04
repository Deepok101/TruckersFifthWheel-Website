const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotifSchema = new Schema({
    sender: {
        type: String,
        required: true
    }, 
    receiver: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    is_read: {
        type: Boolean,
        required: false
    },
    is_read_time: {
        type: Date,
        required: false,
        default: Date.now()
    },
    created: {
        type: Date,
        default: Date.now()
    }

});

module.exports = NotficationSchema = mongoose.model('Notifications', NotifSchema)