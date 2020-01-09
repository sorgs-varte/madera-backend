const mongoose = require('mongoose');

var estimationModulesSchema = mongoose.Schema({
    id: {
        type: String
    },
    qte : {
        type : Number
    }
});

module.exports = mongoose.model('EstimationModules', estimationModulesSchema);