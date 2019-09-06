const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const TruckLoad = require('../../models/TruckLoad');

router.post('/new', (req, res) => {
    let Origin = req.body.origin, OriginState = req.body.originState ,Destination = req.body.destination 
    ,DestinationState = req.body.destinationState, TrailerType = req.body.trailerType, LoadSize = req.body.loadSize
    ,Weight = req.body.weight, Miles = req.body.miles, Payrate = req.body.payrate, CreditReport = req.body.creditReport
    ,Company = req.body.company, DatePosted = req.body.datePosted;

    const newTruckLoad = new TruckLoad({
        Origin,
        OriginState,
        Destination,
        DestinationState,
        TrailerType,
        LoadSize,
        Weight,
        Miles,
        Payrate,
        CreditReport,
        Company,
        DatePosted
    });
    newTruckLoad.save().then(data => res.json(data));
})


module.exports = router;