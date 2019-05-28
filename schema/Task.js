const mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    userId: {
        type: String,
        required : true
    },
    begin: {
        type: Date,
        required: true
    },
    end:{
        type: Date,
        required: true
    },
    task:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);