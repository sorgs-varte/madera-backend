const mongoose = require('mongoose');

var projectEstimationSchema = mongoose.Schema({
    id: {
        type: String
    }
});

module.exports = mongoose.model('ProjectEstimation', projectEstimationSchema);