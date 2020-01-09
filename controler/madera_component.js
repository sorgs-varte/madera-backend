const Component = require('../schema/Component');

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
 * @returns {JSON} return the new component
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
exports.createComponent = function (req, res) {

    if(req.body.code === undefined ||
        req.body.unit === undefined ||
        req.body.description === undefined ||
        req.body.name === undefined ||
        req.body.type === undefined ||
        req.body.providerID === undefined ||
        req.body.refProvider === undefined ||
        req.body.stock === undefined ||
        req.body.cost === undefined){
        res.status(400).json({message: "bad request"});
    }

    let component = {
        code : req.body.code,
        unit : req.body.unit,
        description : req.body.description,
        name : req.body.name,
        type : req.body.type,
        cost : req.body.cost,
        provide : {
            id : req.body.prividerID,
            refProvider : req.body.refProvider,
            stock : req.body.stock
        }
    };

    let _c = new Component(component);

    _c.save((err, result)=>{
        if(err){
            res.status(500).json({message: "internal error"});
        }else{
            res.status(200).json({message: "ok", component: result});
        }
    });
};
/**
 * This function get component by ID
 * @name Get Component By ID
 * @param {JSON} req
 * @param {JSON} res
 * @param {String} componentID
 * @returns {JSON} return a component
 * @example Body request {componentID : "component ID"}
 * Body response {message : "Ok",
 *      component : "JSON component"}
 */
exports.getComponentById = function (req, res) {
    if(req.body.componentID === undefined){
        res.status(400).json({message: "bad request"});
    }
    Component.findOne({_id:req.body.componentID}, function (error, result) {
        if(error){
            res.status(500).json({message: "internal error"});
        }else{
            res.status(200).json({message: "ok", component: result});
        }
    })
};
/**
 * This function create component
 * @name Create Component
 * @param {JSON} req
 * @param {JSON} res
 * @returns {JSON} return a list of component
 * @example GET REQUEST
 * Body response {message : "Ok",
 *      components : "JSON component"}
 */
exports.getAllComponent = function (req, res) {
    Component.find({}, function (error, result) {
        if(error){
            res.status(500).json({message: "internal error"});
        }
        res.status(200).json({message: "ok", components: result});
    });
};

exports.addComponentToModule = function(req, res){
    if(req.body.moduleID === undefined ||
        req.body.componentID === undefined ||
        req.body.qte === undefined){
        res.status(400).json({message: "bad request"});
    }else{
        Module.update({_id: req.body.moduleID}, {$push : {components : {id : req.body.componentID, qte : "1"}}}, function (error, result) {
            if (error) {
                res.status(500).json({message: "internal error"});
            }
            res.status(200).json({message : "ok", module : result});
        })
    }
};