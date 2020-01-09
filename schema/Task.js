const mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    userId: {
        type: String
    },
    time: {
        type: String
    },
    task:{
        type: String
    },
    date : {
        type : Date
    }
});

module.exports = mongoose.model('Task', taskSchema);