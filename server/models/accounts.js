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
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

module.exports = Account = mongoose.model('account', AccountSchema);