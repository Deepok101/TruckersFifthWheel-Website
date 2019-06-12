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
    }
});

module.exports = JobPost = mongoose.model('Job', JobSchema)