const mongoose = require('mongoose');
const componentprovide = require('./ComponentProvide');

var componentSchema = mongoose.Schema({
    code: {
        type: String
    },
    unit : {
        type : String
    },
    description : {
        type : String
    },
    name : {
        type : String
    },
    type : {
        type : String
    },
    provide : {
        type : Object
    },
    cost : {
        type : String
    }
});

module.exports = mongoose.model('Component', componentSchema);