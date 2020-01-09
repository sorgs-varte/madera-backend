const mongoose = require('mongoose');
const estimationModules = require('./EstimationModules');

var estimationSchema = mongoose.Schema({
    state: {
        type: String
    },
    date : {
        type : Date
    },
    price : {
        type : String
    },
    module : {
        type : Array
    },
    discount : {
        type: String
    },
    floorNumber : {
        type : String
    }
});

module.exports = mongoose.model('Estimation', estimationSchema);