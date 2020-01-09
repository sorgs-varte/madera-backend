const mongoose = require('mongoose');

var commandeLineSchema = mongoose.Schema({
    qte: {
        type: Number
    },
    component : {
        type : String
    },
    amount : {
        type : String
    },
    refProvider : {
        type : String
    }
});

module.exports = mongoose.model('CommandeLine', commandeLineSchema);