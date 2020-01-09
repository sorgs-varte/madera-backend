const mongoose = require('mongoose');

var cctpSchema = mongoose.Schema({
    libelle: {
        type: String
    }
});

module.exports = mongoose.model('Cctp', cctpSchema);