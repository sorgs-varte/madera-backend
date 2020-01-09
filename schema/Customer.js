const mongoose = require('mongoose');

var customerSchema = mongoose.Schema({
    name: {
        type: String
    },
    surename: {
        type: String
    },
    road:{
        type: String
    },
    roadNum : {
        type : String
    },
    zipcode : {
        type : String
    },
    city : {
        type : String
    },
    roadExtra : {
        type : String
    },
    phone : {
        type : String
    },
    email : {
        type : String
    }
});

module.exports = mongoose.model('Customer', customerSchema);