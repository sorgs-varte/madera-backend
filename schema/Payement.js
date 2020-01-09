const mongoose = require('mongoose');

var payementSchema = mongoose.Schema({
    step: {
        type: String
    },
    percentage: {
        type: String
    },
    date:{
        type: Date
    }
});

module.exports = mongoose.model('Payement', payementSchema);