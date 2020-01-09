const mongoose = require('mongoose');

var projectInvoiceSchema = mongoose.Schema({
    id : {
        type : String
    }
});

module.exports = mongoose.model('Projectinvoice', projectInvoiceSchema);