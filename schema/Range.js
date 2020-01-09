const mongoose = require('mongoose');

var rangeSchema = mongoose.Schema({
    libelle: {
        type: String
    },
    framequality:{
        type : Array
    },
    insulating:{
        type : Array
    },
    covering:{
        type: Array
    },
    windowsframequality : {
        type : Array
    },
    finishingint : {
        type : Array
    },
    finishingext : {
        type : Array
    }
});

module.exports = mongoose.model('Range', rangeSchema);