const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    company: {
        type: String,
        required: true

    },
    companyDescription: {
        type: String,
        required: false
    },
    jobName: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now 
    },
    applicants: [{
        userID: {
            type: String,
            required: false
        },
        userfirstName:{
            type: String, 
            required: false
        },
        userlastName:{
            type: String,
            required: false
        },
        userEmail:{
            type: String,
            required: false
        },
        userPhoneNumber:{
            type: Number,
            required: false
        }
    }]
});

module.exports = JobPost = mongoose.model('Job', JobSchema)