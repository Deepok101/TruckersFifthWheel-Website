const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfCreation: {
        type: Date,
        default: Date.now,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        picture: {
            type: String,
            required: false
        },
        bio: {
            type: String,
            required: false
        },
        reputation: {
            type: String,
            required: false
        },
        currentPosition: {
            role: {
                type: String,
                required: false
            },
            job : {
                type: String,
                required: false
            }
        },
        experience: [{
            title:{
                type: String,
                required: false
            },
            year: {
                type: String,
                required: false
            },
            position: {
                type: String,
                required: false
            }
        }]
    }
});

module.exports = Accounts = mongoose.model('accounts', AccountSchema);