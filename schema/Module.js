const mongoose = require('mongoose');
const cut = require('./Cut');
const cctp = require('./CCTP');
const moduleComponent = require('./ModuleComponent');

var moduleSchema = mongoose.Schema({
    name: {
        type: String
    },
    cost : {
        type : String
    },
    angle : {
        type : String
    },
    cut : {
        type : Object
    },
    range : {
        type : String
    },
    rangeName : {
        type : String
    },
    components : {
        type : Array
    },
    type : {
        type : String
    },
    rangeAttributes : {
        type : Object
    },
    x : {
        type : String
    },
    y : {
        type : String
    },
    height : {
        type : String
    },
    width : {
        type : String
    },
    floorHouse : {
        type : String
    },
    estimationID : {
        type : String
    }
});

module.exports = mongoose.model('Module', moduleSchema);