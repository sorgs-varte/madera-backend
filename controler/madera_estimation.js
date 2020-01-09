const Estimation = require('../schema/Estimation');
const Project = require('../schema/Project');


/**
 * This function delete an estimation
 * @name Delete Estimation
 * @param{JSON} req
 * @param {JSON} res
 * @param {String} estimationID
 * @param {String} projectID
 * @returns {JSON} return message "Ok"
 * @example Body request {estimationID : "Estimation ID", projectID : "Project ID"}
 * Body response {message : "Ok",
 *      result : "JSON who resume the update nUpdate = 1"}
 */
exports.deleteEstimation = function(req, res){
    if(req.body.estimationID === undefined
        || req.body.projectID === undefined){
        res.status(400).json({message : "bad request"});
    }

    let estiD = req.body.estimationID;
    Estimation.remove({_id : estiD}, (error, result)=>{
        if(error){
            res.status(500).json({message : "internal error"});
        }
        Project.findOne({_id : req.body.projectID}, function (error2, result2) {
            if(error2){
                res.status(500).json({message : "internal error"});
            }
            for(let i = 0 ; i < result2.estimation.length; i++){
                if(result2.estimation[i]["id"] == estiD){
                    result2.estimation.splice(i, 1);
                    break;
                }
            }
            Project.updateOne({_id: req.body.projectID}, {$set : {estimation : result2.estimation}}, function (error3, result3) {
                if(error3){
                    res.status(500).json({message : "internal error"});
                }
                res.status(200).json({message : "ok", project : result3});
            });
        });
    });
};

exports.modifyEstimation = function(req, res){
    if(req.body.price === undefined ||
        req.body.module === undefined ||
        req.body.state === undefined ||
        req.body.discount === undefined ||
        req.body.estimationID === undefined){
        res.status(400).json({message : "bad request"});
    }

    let module = JSON.parse(req.body.module);

    let esti = {
        module : module,
        state : req.body.state,
        price : req.body.price,
        discount : req.body.discount
    };

    Estimation.updateOne({_id : req.body.estimationID}, {$set:esti},  (error, result)=>{
        if(error){
            res.status(500).json({message : "internal error"});
        }
        res.status(200).json({message : "ok", estimation : result});
    });
};

/**
 * This function get an estimation by his ID
 * @name Get Estimation By ID
 * @param{JSON} req
 * @param {JSON} res
 * @param {String} estimationID
 * @returns {JSON} return an estimation
 * @example Body request {estimationID : "Estimation ID"}
 * Body response {message : "Ok",
 *      estimation : "JSON estimation"}
 */
exports.getestimationbyid = function (req, res) {
    if (req.body.estimationID === undefined) {
        res.status(400).json({message: "bad request"});
    }

    Estimation.findOne({_id: req.body.estimationID}, (error, result) => {
        if (error) {
            res.status(500).json({message: "internal error"});
        }
        res.status(200).json({message: "ok", estimation: result});
    });
};

/**
 * This function create an estimation
 * @name Create Estimation
 * @param{JSON} req
 * @param {JSON} res
 * @param {String} price
 * @param {Array} module
 * @param {String} projectID
 * @param {String} discount
 * @returns {JSON} return estimation
 * @example Body request {price : "price of the estimation",
 *      module : "Array of module who compose the estimation",
 *      projectID : "Project ID",
 *      discount : "Discount"}
 * Body response {message : "Ok",
 *      estimation : "JSON estimation"}
 */
exports.createEstimation = function(req, res){
    if(req.body.price === undefined ||
        req.body.module === undefined ||
        req.body.projectID === undefined ||
        req.body.discount === undefined){
        res.status(400).json({message : "bad request"});
    }

    let moduleArray = JSON.parse(req.body.module);

    //moduleArray = req.body.module;
    let estimation = {
        state: "0",
        date : new Date(),
        price : req.body.price,
        discount : req.body.discount,
        module : moduleArray,
        floorNumber : 1
    };

    let _e = new Estimation(estimation);

    _e.save((error1, result1)=>{
        if(error1){
            res.status(500).json({message : "internal error"});
        }

        let estiPush = {
            id : result1._id
        };
        Project.update({_id : req.body.projectID}, {$push: {estimation: estiPush}}, (error2, result2)=>{
            if(error2){
                res.status(500).json({message : "internal error"});
            }
            res.status(200).json({message : "ok", estimation : result1});
        });
    });
};
/**
 * This function update an estimation's discount
 * @name Update Estimation Discount
 * @param{JSON} req
 * @param {JSON} res
 * @param {String} estimationID
 * @param {String} discount
 * @returns {JSON} return update state
 * @example Body request {estimationID : "Estimation ID",
 *      discount : "Discount value"}
 * Body response {message : "Ok",
 *      estimation : "nUpdate = 1"}
 */
exports.updateEstimationDiscount = function (req, res) {
    if(req.body.discount === undefined || req.body.estimationID === undefined){
        res.status(400).json({message: "bad request"});
    }else {
        Estimation.updateOne(
            {_id : req.body.estimationID},
            {$set:{discount : req.body.discount}},
            function (error, result) {
                if(error){
                    res.status(500).json({message: "internal error"});
                }else{
                    res.status(200).json({message: "ok", estimation: result});
                }
            });
    }
};
/**
 * This function update an estimation's state
 * @name Update Estimation State
 * @param{JSON} req
 * @param {JSON} res
 * @param {String} estimationID
 * @param {String} state
 * @returns {JSON} return update state
 * @example Body request {estimationID : "Estimation ID",
 *      state : "State value"}
 * Body response {message : "Ok",
 *      estimation : "nUpdate = 1"}
 */
exports.updateStateEstimation = function (req, res) {
    if(req.body.estimationID === undefined || req.body.state === undefined){
        res.status(400).json({message: "bad request"});
    }else{
        Estimation.updateOne({_id: req.body.estimationID}, {$set: {state : req.body.state}}, (error, result)=>{
            if(error){
                res.status(500).json({message: "internal error"});
            }else{
                res.status(200).json({message: "ok", estimation: result});
            }
        });
    }
};
/**
 * This function update an estimation's floor
 * @name Update Estimation floor
 * @param{JSON} req
 * @param {JSON} res
 * @param {String} estimationID
 * @param {String} floor
 * @returns {JSON} return update floor
 * @example Body request {estimationID : "Estimation ID",
 *      floor : "Floor value"}
 * Body response {message : "Ok",
 *      estimation : "nUpdate = 1"}
 */
exports.updateFloorEstimation = function (req, res) {
    //console.log(req.body);
    if(req.body.estimationID === undefined || req.body.floorNumber === undefined){
        res.status(400).json({message: "bad request"});
    }else{
        Estimation.updateOne({_id: req.body.estimationID}, {$set: {floorNumber : req.body.floorNumber}}, (error, result)=>{
            if(error){
                res.status(500).json({message: "internal error"});
            }else{
                res.status(200).json({message: "ok", estimation: result});
            }
        });
    }
};
/**
 * This function update an estimation's price
 * @name Update Estimation Price
 * @param{JSON} req
 * @param {JSON} res
 * @param {String} estimationID
 * @param {String} price
 * @returns {JSON} return update price
 * @example Body request {estimationID : "Estimation ID",
 *      price : "Price value"}
 * Body response {message : "Ok",
 *      estimation : "nUpdate = 1"}
 */
exports.updatePriceEstimation = function (req, res) {
    if(req.body.estimationID === undefined || req.body.price === undefined){
        res.status(400).json({message: "bad request"});
    }else{
        Estimation.updateOne({_id: req.body.estimationID}, {$set: {price : req.body.price}}, (error, result)=>{
            if(error){
                res.status(500).json({message: "internal error"});
            }else{
                res.status(200).json({message: "ok", estimation: result});
            }
        });
    }
};