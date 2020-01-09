const mongoose = require('mongoose');

var projectPayementSchema = mongoose.Schema({
    id : {
        type : String
    }
});

module.exports = mongoose.model('ProjectPayement', projectPayementSchema);