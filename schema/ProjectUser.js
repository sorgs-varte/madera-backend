const mongoose = require('mongoose');

var projectUserSchema = mongoose.Schema({
    id : {
        type : String
    },
    incharge : {
        type : Boolean
    }
});

module.exports = mongoose.model('ProjectUser', projectUserSchema);