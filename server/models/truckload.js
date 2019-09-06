const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TruckLoadSchema = new Schema({
    Origin: {
        type: String,
        required: true
    },
    OriginState: {
        type: String,
        required: true
    },
    Destination: {
        type: String,
        required: true
    },
    DestinationState: {
        type: String,
        required: true
    },
    TrailerType: {
        type: String,
        required: true
    },
    LoadSize: {
        type: String,
        required: false
    },
    Weight: {
        type: String,
        required: false
    },
    Miles: {
        type: String,
        required: true
    },
    Payrate: {
        type: Number,
        required: false
    },
    CreditReport: {
        type: Number,
        required: true
    },
    Company: {
        type: String, 
        required: true
    },
    DatePosted: {
        type: Date,
        default: Date.now()
    }

});

module.exports = TruckLoad = mongoose.model('Truck Load', TruckLoadSchema)