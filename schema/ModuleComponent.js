const mongoose = require('mongoose');

var moduleComponentSchema = mongoose.Schema({
    id: {
        type: String
    },
    qte : {
        type : Number
    }
});

module.exports = mongoose.model('ModuleComponent', moduleComponentSchema);