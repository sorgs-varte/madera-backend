const Module = require('../schema/Module');
const Estimation = require('../schema/Estimation');
const Component = require('../schema/Component');



/**
 * This function create a module
 * @name Create Module Model
 * @param{JSON} req
 * @param {JSON} res
 * @param {String} name
 * @param {String} cost
 * @param {String} angle
 * @param {String} cut
 * @param {String} range
 * @param {String} rangeName
 * @param {Array} components
 * @returns {JSON} return a Module
 * @example Body request {name : "name of the module",
 *      cost : "cost of the module",
 *      angle : "angle ID of the module",
 *      cut : "cut ID of the module",
 *      range : "range ID of the module",
 *      rangeName : "range Name of the module",
 *      components : "Array of the components who compose the module"}
 * Body response {message : "Ok",
 *      module : "JSON module"}
 */
exports.createModule = function (req, res) {
    if(req.body.name === undefined ||
        req.body.cost === undefined ||
        req.body.angle === undefined ||
        req.body.cut === undefined ||
        req.body.range === undefined ||
        req.body.rangeName === undefined ||
        req.body.components === undefined){
        res.status(400).json({message: "bad request"});
    }

    let module = {
        name : req.body.name,
        cost : req.body.cost,
        angle : req.body.angle,
        cut : req.body.cut,
        type: "model",
        range : req.body.range,
        rangeName : req.body.rangeName,
        rangeAttributes : {},
        components : JSON.parse(req.body.components)
    };

    let _m = new Module(module);
    _m.save((error, result)=>{
        if (error) {
            res.status(500).json({message: "internal error"});
        }
        res.status(200).json({message: "ok", module: result});
    });
};

/**
 * This function create a module
 * @name Create Module Basic
 * @param{JSON} req
 * @param {JSON} res
 * @param {String} name
 * @param {String} cost
 * @param {String} angle
 * @param {String} cut
 * @param {String} range
 * @param {String} rangeName
 * @param {Array} components
 * @returns {JSON} return a Module
 * @example Body request {name : "name of the module",
 *      cost : "cost of the module",
 *      angle : "angle ID of the module",
 *      cut : "cut ID of the module",
 *      range : "range ID of the module",
 *      rangeName : "range Name of the module",
 *      components : "Array of the components who compose the module"}
 * Body response {message : "Ok",
 *      module : "JSON module"}
 */
exports.createModuleBasic = function (req, res) {
    if(req.body.name === undefined ||
        req.body.cost === undefined ||
        req.body.angle === undefined ||
        req.body.cut === undefined ||
        req.body.range === undefined ||
        req.body.rangeName === undefined ||
        req.body.components === undefined ||
        req.body.estimationID === undefined){
        res.status(400).json({message: "bad request"});
    }


    let module = {
        name : req.body.name,
        cost : req.body.cost,
        angle : req.body.angle,
        cut : req.body.cut,
        type: "basic",
        range : req.body.range,
        rangeName : req.body.rangeName,
        rangeAttributes : {},
        components : JSON.parse(req.body.components),
        estimationID : req.body.estimationID
    };

    let _m = new Module(module);
    _m.save((error, result)=>{
        if (error) {
            res.status(500).json({message: "internal error"});
        }
        Estimation.updateOne({_id : req.body.estimationID}, {$push:{module: {id : result._id}}}, (error2, result2)=>{
            if(error2){
                res.status(500).json({message: "internal error"});
            }
            res.status(200).json({message: "ok", module: result});
        });
    });
};
/**
 * This function create a module
 * @name Create Module Custom with estimation ID
 * @param{JSON} req
 * @param {JSON} res
 * @param {String} name
 * @param {String} cost
 * @param {String} angle
 * @param {String} cut
 * @param {String} range
 * @param {String} rangeName
 * @param {Array} components
 * @param {String} x
 * @param {String} y
 * @param {String} floorHouse
 * @param {String} width
 * @param {String} height
 * @param {Array} rangeAttributes
 * @returns {JSON} return a Module
 * @example Body request {name : "name of the module",
 *      cost : "cost of the module",
 *      angle : "angle ID of the module",
 *      cut : "cut ID of the module",
 *      range : "range ID of the module",
 *      rangeName : "range Name of the module",
 *      components : "Array of the components who compose the module",
 *      x : "x position on the map",
 *      y : "y position on the map",
 *      floorHouse : "floor value",
 *      width : "width of the module",
 *      height : "height of the module",
 *      rangeAttributes : "attributes of the module"}
 * Body response {message : "Ok",
 *      module : "JSON module"}
 */
exports.createModuleWithEstimationID = function (req, res) {
    if(req.body.name === undefined ||
        req.body.cost === undefined ||
        req.body.cut === undefined ||
        req.body.angle === undefined ||
        req.body.range === undefined ||
        req.body.rangeName === undefined ||
        req.body.estimationID === undefined ||
        req.body.components === undefined ||
        req.body.x === undefined ||
        req.body.y === undefined ||
        req.body.floorHouse === undefined ||
        req.body.width === undefined ||
        req.body.height === undefined ||
        req.body.rangeAttributes === undefined){
        res.status(400).json({message: "bad request"});
    }


    let module = {
        name : req.body.name,
        cost : req.body.cost,
        angle : req.body.angle,
        cut : req.body.cut,
        type : "custom",
        range : req.body.range,
        rangeName : req.body.rangeName,
        components : JSON.parse(req.body.components),
        rangeAttributes : JSON.parse(req.body.rangeAttributes),
        x : req.body.x,
        y : req.body.y,
        height : req.body.height,
        width : req.body.width,
        floorHouse: req.body.floorHouse
    };

    let _m = new Module(module);
    _m.save((error, result)=>{
        if (error) {
            res.status(500).json({message: "internal error"});
        }
        Estimation.updateOne({_id : req.body.estimationID}, {$push:{module: {id : result._id}}}, (error2, result2)=>{
            if(error2){
                res.status(500).json({message: "internal error"});
            }
            res.status(200).json({message: "ok", module: result});
        });
    });
};

/**
 * This function get a module by his ID
 * @name Get Module By ID
 * @param{JSON} req
 * @param {JSON} res
 * @param {String} moduleID
 * @returns {JSON} return a module
 * @example Body request {moduleID : "Module ID"}
 * Body response {message : "Ok",
 *      module : "JSON module"}
 */
exports.getModuleById = function (req, res) {
    if(req.body.moduleID === undefined){
        res.status(400).json({message: "bad request"});
    }
    Module.findOne({_id:req.body.moduleID}, function (error, result) {
        if(error){
            res.status(500).json({message: "internal error"});
        }else{
            res.status(200).json({message: "ok", module: result});
        }
    })
};

/**
 * This function get all module
 * @name Get All Module
 * @param{JSON} req
 * @param {JSON} res
 * @returns {JSON} return a list of module
 * @example GET REQUEST
 * Body response {message : "Ok",
 *      modules : "JSON module"}
 */
exports.getAllModule = function (req, res) {
    Module.find({}, function (error, result) {
        if(error){
            res.status(500).json({message: "internal error"});
        }
        res.status(200).json({message: "ok", modules: result});
    });
};

/**
 * This function add a module to an estimation
 * @name Add module to estimation
 * @param{JSON} req
 * @param {JSON} res
 * @param {String} moduleID
 * @param {String} estimationID
 * @returns {JSON} return an update status
 * @example Body request {estimationID : "Estimation ID",
 *      moduleID : "module ID"}
 * Body response {message : "Ok",
 *      estimation : "nUpdate = 1"}
 */
exports.addModuleToEstimation = function (req, res) {
    if(req.body.moduleID === undefined || req.body.estimationID === undefined){
        res.status(400).json({message: "bad request"});
    }
    Estimation.updateOne({_id : req.body.estimationID}, {$push : {module : {id : req.body.moduleID}}}, function (error, result) {
        if(error){
            res.status(500).json({message: "internal error"});
        }
        res.status(200).json({message: "ok", estimation: result});
    });
};

/**
 * This function delete a module on an estimation
 * @name Delete Module On Estimation
 * @param{JSON} req
 * @param {JSON} res
 * @param {String} moduleID
 * @param {String} estimationID
 * @returns {JSON} return an update status
 * @example Body request {estimationID : "Estimation ID",
 *      moduleID : "module ID"}
 * Body response {message : "Ok",
 *      estimation : "nUpdate = 1"}
 */
exports.deleteModuleOnEstimation = function (req, res) {
    if(req.body.moduleID === undefined || req.body.estimationID === undefined){
        res.status(400).json({message: "bad request"});
    }
    let estiD = req.body.estimationID;
    let modID = req.body.moduleID;
    Estimation.findOne({_id : estiD}, function (error, result) {
        if(error){
            res.status(500).json({message: "internal error"});
        }
        for(let i = 0 ; i < result.module.length; i++){
            if(result.module[i].id.toString() === modID){
                result.module.splice(i, 1);
                break;
            }
        }
        result.save((error3)=>{
            if(error3){
                res.status(500).json({message: "internal error"});
            }else{
                res.status(200).json({message: "ok", estimation: result});
            }
        });
    });
};

/**
 * This function get module model
 * @name Get All Module
 * @param{JSON} req
 * @param {JSON} res
 * @returns {JSON} return a list of module
 * @example GET REQUEST
 * Body response {message : "Ok",
 *      modules : "JSON module"}
 */
exports.getAllModuleTypeModel = function (req, res) {
    Module.find({type : "model"}, (error, result)=>{
        if(error){
            res.status(500).json({message : "internal error"});
        }else{
            res.status(200).json({message : "ok", modules : result});
        }
    });
};

exports.createModuleEstimationWithComponents = function (req, res) {
    if(req.body.name === undefined ||
        req.body.cost === undefined ||
        req.body.cut === undefined ||
        req.body.angle === undefined ||
        req.body.range === undefined ||
        req.body.components === undefined ||
        req.body.rangeName === undefined ||
        req.body.estimationID === undefined){
        res.status(400).json({message: "bad request"});
    }

    let module = {
        name : req.body.name,
        cost : req.body.cost,
        angle : req.body.angle,
        cut : req.body.cut,
        type : "custom",
        range : req.body.range,
        rangeName : req.body.rangeName,
        rangeAttributes : {},
        components : JSON.parse(req.body.components)
    };

    let _m = new Module(module);
    _m.save((error, result)=>{
        if (error) {
            res.status(500).json({message: "internal error"});
        }
        Estimation.updateOne({_id : req.body.estimationID}, {$push:{module: {id : result._id}}}, (error2, result2)=>{
            if(error2){
                res.status(500).json({message: "internal error"});
            }
            res.status(200).json({message: "ok", module: result});
        });
    });
};

exports.updateModule = function (req, res) {
    //angle, cut, rangeAttributes

    if(req.body.moduleID === undefined ||
        req.body.angle === undefined ||
        req.body.cut === undefined ||
        req.body.rangeAttributes === undefined){
        res.status(400).json({message: "bad request"});
    }else{
        Module.updateOne({_id : req.body.moduleID},
            {$set:{
                angle: req.body.angle,
                cut : req.body.cut,
                rangeAttributes: JSON.parse(req.body.rangeAttributes)}
            },
            (error, result)=>{
                if(error){
                    res.status(500).json({message : "internal error"});
                }else{
                    res.status(200).json({message : "ok", module : result});
                }
        });
    }
};
/**
 * This function get a module by ID
 * @name Get Module By ID
 * @param{JSON} req
 * @param {JSON} res
 * @param {String} estimationID
 * @returns {JSON} return a list of module
 * @example Body request {estimationID : "Estimation ID"}
 * Body response {message : "Ok",
 *      modules : "JSON module"}
 */
exports.getModuleByEstimation = function (req, res) {
    if(req.body.estimationID === undefined){
        res.status(400).json({message: "bad request"});
    }else{
        console.log(req.body.estimationID);
        Module.find({estimationID : req.body.estimationID}, (error, result)=>{
            if(error){
                res.status(500).json({message : "internal error"});
            }else{
                console.log(result);
                res.status(200).json({message : "ok", module : result});
            }
        });
    }
};