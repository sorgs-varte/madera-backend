
const Customer = require('../schema/Customer');


/**
 * This function create a customer
 * @name Create Customer
 * @param{JSON} req
 * @param {JSON} res
 * @param {String} name
 * @param {String} surename
 * @param {String} road
 * @param {String} roadNum
 * @param {String} roadExtra
 * @param {String} zipcode
 * @param {String} city
 * @param {String} phone
 * @param {String} email
 * @returns {JSON} return the new customer
 * @example Body request {name : "name of the customer",
 *      surename : "surname of the customer",
 *      road : "road name",
 *      roadNum : "number of the road",
 *      roadExtra : "extra of the road",
 *      zipcode : "zipcode",
 *      city : "city",
 *      phone : "phone of the customer",
 *      email : "email of the customer"}
 * Body response {message : "Ok",
 *      customer : "JSON customer"}
 */
exports.createCustomer = function (req, res) {
    if (req.body.name === undefined ||
        req.body.surename === undefined ||
        req.body.road === undefined ||
        req.body.roadNum === undefined ||
        req.body.roadExtra === undefined ||
        req.body.zipcode === undefined ||
        req.body.city === undefined ||
        req.body.phone === undefined ||
        req.body.email === undefined) {
        res.status(400).json({message: "bad request"});
    } else {
        let customer = {
            name: req.body.name,
            surename: req.body.surename,
            road: req.body.road,
            roadNum: req.body.roadNum,
            zipcode: req.body.zipcode,
            city: req.body.city,
            roadExtra: req.body.roadExtra,
            phone: req.body.phone,
            email: req.body.email
        };

        let _c = new Customer(customer);
        _c.save((err, cust) => {
            if (err) {
                res.status(500).json({message: "internal error"});
            } else {
                res.status(200).json({message: "ok", customer: cust})
            }
        })
    }
};

/**
 * This function get all customer
 * @name Get All Customer
 * @param{JSON} req
 * @param {JSON} res
 * @returns {JSON} return a customer list
 * @example GET REQUEST
 * Body response {message : "Ok",
 *      customer : "JSON customer"}
 */
exports.getallcustomer = function (req, res) {
    Customer.find({}, (err, result) => {
        if (err) {
            res.status(500).json({
                message: "internal error"
            })
        } else {
            res.status(200).json({
                message: "ok",
                customers: result
            })
        }
    })
};

exports.updateCustomer = function (req, res) {
    if (req.body.name === undefined ||
        req.body.surename === undefined ||
        req.body.road === undefined ||
        req.body.roadNum === undefined ||
        req.body.roadExtra === undefined ||
        req.body.zipcode === undefined ||
        req.body.city === undefined ||
        req.body.phone === undefined ||
        req.body.email === undefined ||
        req.body.id === undefined) {
        res.status(400).json({message: "bad request"});
    } else {
        let customer = {
            name: req.body.name,
            surename: req.body.surename,
            road: req.body.road,
            roadNum: req.body.roadNum,
            zipcode: req.body.zipcode,
            city: req.body.city,
            roadExtra: req.body.roadExtra,
            phone: req.body.phone,
            email: req.body.email
        };

        Customer.updateOne({_id : req.body.id}, {$set:customer}, (error, result)=>{
            if(error){
                res.status(500).json({message: "internal error"});
            }else{
                res.status(200).json({message: "ok", component: result});
            }
        });
    }
};
/**
 * This function get a customer by ID
 * @name Get Customer By ID
 * @param{JSON} req
 * @param {JSON} res
 * @param {String} customerID
 * @returns {JSON} return a customer
 * @example Body request {customerID : "customer ID"}
 * Body response {message : "Ok",
 *      customer : "JSON customer"}
 */
exports.getCustomerById = function (req, res) {
    if(req.body.customerID === undefined){
        res.status(400).json({message: "bad request"});
    }else {
        Customer.findOne({_id : req.body.customerID}, function (error, result) {
            if(error){
                res.status(500).json({message: "internal error"});
            }else{
                res.status(200).json({message: "ok", customer: result});
            }
        })
    }
};