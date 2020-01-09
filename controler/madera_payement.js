const Payement = require('../schema/Payement');
const Project = require('../schema/Project');
const Estimation = require('../schema/Estimation');
const InvoiceProject = require('../schema/InvoiceProject');

/**
 * This function create component
 * @name Create Component
 * @param {JSON} req
 * @param {JSON} res
 * @param {String} code
 * @param {String} unit
 * @param {String} desciption
 * @param {String} name
 * @param {String} type
 * @param {String} providerID
 * @param {String} refProvider
 * @param {String} stock
 * @param {String} cost
 * @returns {JSON} return the new customer
 * @example Body request {code : "component code",
 *      description : "component's description",
 *      name : "component's name",
 *      type : "component's type",
 *      providerID : "provider ID",
 *      refProvider : "reference provider,
 *      stock : "stock quantity",
 *      cost : "cost per unit"}
 * Body response {message : "Ok",
 *      component : "JSON component"}
 */
exports.getPayementById = function (req, res) {
    if(req.body.payementID === undefined){
        res.status(400).json({message: "bad request"});
    }else{
        Payement.findOne({_id : req.body.payementID}, function (error, result) {
            if(error){
                res.status(500).json({message: "internal error"});
            }else{
                res.status(200).json({message: "ok", payement: result});
            }
        });
    }
};
/**
 * This function create payement
 * @name Create Payement
 * @param {JSON} req
 * @param {JSON} res
 * @param {String} step
 * @param {String} percent
 * @param {String} projectID
 * @param {String} estimationID
 * @returns {JSON} return the new payement
 * @example Body request {step : "step of the payement",
 *      percent : "percent of the payement",
 *      projectID : "project ID",
 *      estimationID : "estimation ID"}
 * Body response {message : "Ok",
 *      payement : "JSON payement"}
 */
exports.createPayement = function (req, res) {
    if(req.body.step === undefined ||
        req.body.percent === undefined ||
        req.body.projectID === undefined ||
        req.body.estimationID === undefined){
        res.status(400).json({message: "bad request"});
    }else{
        let payement = {
            step : req.body.step,
            percentage : req.body.percent,
            date : new Date()
        };

        let _p = new Payement(payement);

        _p.save((error, result)=>{
            if(error){
                res.status(500).json({message: "internal error"});
            }else{
                Project.updateOne({_id: req.body.projectID},
                    {$push : {payement : {id : result._id.toString()}}},
                    function (error2, result2) {
                    if(error2){
                        res.status(500).json({message: "internal error"});
                    }else{
                        //Estimation update to accepté
                        Estimation.updateOne({_id : req.body.estimationID}, {$set:{state : "1"}}, function (error3, result3) {
                            if(error3){
                                res.status(500).json({message: "internal error"});
                            }else{
                                //create invoiceProject
                                //update Project with this invoiceProject
                                //create PDF for invoiceProject
                                //update all component stock
                                res.status(200).json({message: "ok", payement: result});
                            }
                        });
                    }
                });
            }
        });
    }
};