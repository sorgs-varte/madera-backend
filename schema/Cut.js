const mongoose = require('mongoose');

var cutSchema = mongoose.Schema({
    name: {
        type: String
    },
    enumComponent : {
        type : Array
    }
});

module.exports = mongoose.model('Cut', cutSchema);