const mongoose = require('mongoose');

var providerInvoiceSchema = mongoose.Schema({
    id: {
        type: String
    }
});

module.exports = mongoose.model('ProviderInvoice', providerInvoiceSchema);