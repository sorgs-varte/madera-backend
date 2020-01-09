const mongoose = require('mongoose');

var invoiceSchema = mongoose.Schema({
    amount: {
        type: String
    },
    date:{
        type: Date
    }
});

module.exports = mongoose.model('Invoice', invoiceSchema);