const mongoose = require('mongoose');
const providerInvoice = require('./ProviderInvoice');

var providerSchema = mongoose.Schema({
    name: {
        type: String
    },
    city : {
        type : String
    },
    road : {
        type : String
    },
    roadNum : {
        type : String
    },
    zipcode : {
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
    },
    invoice : {
        type : Array
    }
});

module.exports = mongoose.model('Provider', providerSchema);