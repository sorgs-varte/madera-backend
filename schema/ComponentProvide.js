const mongoose = require('mongoose');

var componentProvideSchema = mongoose.Schema({
    id: {
        type: String
    },
    refProvider : {
        type : String
    },
    stock : {
        type : Number
    }
});

module.exports = mongoose.model('ComponentProvide', componentProvideSchema);