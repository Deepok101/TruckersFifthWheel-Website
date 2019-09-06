const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");


//Item Model
const JobPost = require('../../models/Jobs')


//@route GET api/jobs

router.get('/', (req, res) => {
    JobPost.find().then(data => res.json(data))
});

router.get('/id/:id', (req, res)=>{
    var id = req.params.id;
    JobPost.findById(mongoose.Types.ObjectId(id)).then(data=>res.json(data))
})

router.get('/salary/:salary', (req, res)=>{
    var salary = req.params.salary
    JobPost.find({salary: { $gt: salary }}).then(data=>res.json(data))
})

router.get('/search/location/:location', (req, res)=>{
    var location = (req.params.location);
    JobPost.find({city : { $regex: location, $options: 'i'}}).then(data=> res.json(data))
})
  

//@route POST api/jobs

router.post('/', (req, res)=>{
    var company = req.body.company;
    var companyDescription = req.body.compDesc;
    var jobName = req.body.jobName;
    var jobDescription = req.body.jobDesc;
    var city = req.body.city;
    var province = req.body.province;
    var salary = req.body.salary;

    const newJob = new JobPost({
        company: company,
        companyDescription: companyDescription,
        jobName: jobName,
        jobDescription: jobDescription,
        city: city,
        province: province,
        salary: salary
    })
    newJob.save().then(data => res.json(data))
})

router.post('/apply', (req, res)=>{
    var userID = req.body.userid;
    var userfirstName = req.body.fname;
    var userlastName = req.body.lname;
    var userEmail = req.body.email;
    var userPhoneNumber = req.body.phone;
    var id = req.body.id;
    var applicant = {
        userID: userID,
        userfirstName: userfirstName,
        userlastName: userlastName,
        userEmail: userEmail,
        userPhoneNumber: userPhoneNumber
    }

    JobPost.updateOne({_id: id}, {$push: {applicants: applicant}} , (err, result)=>{
        if (err){
            console.log(err)
        } else {
            res.json(result)
        }
    })
})



module.exports = router;