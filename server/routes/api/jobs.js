const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");


//Item Model
const JobPost = require('../../models/Jobs')


//@route GET api/jobs

router.get('/', (req, res) => {
    JobPost.find().then(data => res.json(data))
});

//@route POST api/jobs

router.post('/', (req, res)=>{
    var company = req.body.company;
    var companyDescription = req.body.compDesc;
    var jobName = req.body.jobName;
    var jobDescription = req.body.jobDesc;

    const newJob = new JobPost({
        company: company,
        companyDescription: companyDescription,
        jobName: jobName,
        jobDescription: jobDescription
    })
    newJob.save().then(data => res.json(data))
})

module.exports = router;