const Cut = require('../schema/Cut');

exports.createCut = function (req, res) {
    if(req.body.name === undefined || req.body.enumComponent === undefined){
        res.status(400).json({message: "internal error"});
    }else{
        let cut = {
            name : req.body.name,
            enumComponent: JSON.parse(req.body.enumComponent)
        };

        let _c = new Cut(cut);

        _c.save((error, result)=>{
            if(error){
                res.status(500).json({message: "internal error"});
            }else{
                res.status(200).json({message: "ok", cut: result});
            }
        });
    }
};
/**
 * This function get all cut
 * @name Get All Cut
 * @param {JSON} req
 * @param {JSON} res
 * @returns {JSON} return a list of the cut
 * @example GET REQUEST
 * Body response {message : "Ok",
 *      cuts : "JSON cut"}
 */
exports.getAllCut = function (req, res) {
    Cut.find({}, (error, result)=>{
        if(error){
            res.status(500).json({message: "internal error"});
        }else{
            res.status(200).json({message: "ok", cuts: result});
        }
    });
};

