const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

//Item Model
const RoadAlert = require('../../models/RoadAlert')

//@route GET api/items

router.get('/', (req, res) => {
    RoadAlert.find().sort({date: -1}).then(data => res.json(data))
});

router.post('/upload', (req, res) => {
    const newAlert = new RoadAlert({
        userID: req.body.userID,
        address: req.body.address,
        city: req.body.city,
        description: req.body.description,
        type: req.body.type
    });

    newAlert.save().then(newAlert => res.json(newAlert))
});


module.exports = router;