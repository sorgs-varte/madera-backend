const mongoose = require('mongoose');
const projectUser = require('./ProjectUser');
const projectInvoice = require('./ProjectInvoice');
const projectPayement = require('./ProjectPayement');
const projectEstimation = require('./ProjectEstimation');

var projectSchema = mongoose.Schema({
    name: {
        type: String
    },
    date: {
        type: Date
    },
    road:{
        type: String
    },
    roadNum : {
        type : String
    },
    zipcode : {
        type : String
    },
    city : {
        type : String
    },
    roadExtra : {
        type : String
    },
    reference:{
        type :String
    },
    customer: {
        type: String
    },
    user:{
        type : Object
    },
    invoice : {
        type : Array
    },
    payement : {
        type : Array
    },
    estimation : {
        type : Array
    }
});

module.exports = mongoose.model('Project', projectSchema);