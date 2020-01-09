
const Range = require('../schema/Range');

exports.createRange = function (req, res) {
    if(req.body.range === undefined ||
        req.body.framequality === undefined ||
        req.body.insulating === undefined ||
        req.body.covering === undefined ||
        req.body.windowsframequality === undefined ||
        req.body.finishing === undefined){
        res.status(500).json({message: "internal error"});
    }else{
        range = {
            libelle : JSON.parse(req.body.range),
            framequality : JSON.parse(req.body.framequality),
            insulating : JSON.parse(req.body.insulating),
            covering : JSON.parse(req.body.covering),
            windowsframequality : JSON.parse(req.body.windowsframequality),
            finishingint : JSON.parse(req.body.finishingint),
            finishingext : JSON.parse(req.body.finishingext)
        };

        _r = new Range(range);
        _r.save((error, result)=>{
            if(error){
                res.status(500).json({message: "internal error"});
            }else{
                res.status(200).json({message: "ok", range: result});
            }
        });
    }
};

exports.deleteRange = function (req, res) {
    if(req.body.rangeID === undefined){
        res.status(400).json({message: "internal error"});
    }else{
        Range.remove({_id : req.body.rangeID}, (error, result)=>{
            if(error){
                res.status(500).json({message: "internal error"});
            }else{
                res.status(200).json({message: "ok", range: result});
            }
        });
    }
};
/**
 * This function get all range
 * @name Get All Range
 * @param {JSON} req
 * @param {JSON} res
 * @returns {JSON} return a list of range
 * @example GET REQUEST
 * Body response {message : "Ok",
 *      range : "JSON range"}
 */
exports.getAllRange = function (req, res) {
    Range.find({}, (error, result)=>{
        if(error){
            res.status(500).json({message: "internal error"});
        }else{
            res.status(200).json({message: "ok", range: result});
        }
    });
};

exports.getRangeByID = function (req, res) {
    if(req.body.rangeID === undefined){
        res.status(400).json({message: "bad request"});
    }else{
        Range.findOne({_id : req.body.rangeID}, function (error, result) {
            if(error){
                res.status(500).json({message: "internal error"});
            }else{
                res.status(200).json({message: "ok", range: result});
            }
        });
    }
};