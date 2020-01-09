const mongoose = require('mongoose');
const commandeLine = require('./CommandeLine');

var providerInvoiceSchema = mongoose.Schema({
    date: {
        type: Date
    },
    amount : {
        type : String
    },
    commandeLine : {
        type : Array
    }
});

module.exports = mongoose.model('ProviderInvoice', providerInvoiceSchema);