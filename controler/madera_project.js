const User = require('../schema/User');
const Project = require('../schema/Project');
const Customer = require('../schema/Customer');

/**
 * This function create a new project
 * @name Create Project
 * @param{JSON} req
 * @param {JSON} res
 * @param {String} userID
 * @param {String} road
 * @param {String} roadNum
 * @param {String} roadExtra
 * @param {String} zipcode
 * @param {String} customerID
 * @param {String} city
 * @param {String} reference
 * @param {String} projectName
 * @returns {JSON} return the new project
 * @example Body request {userID : "NoSql ID USER",
 *      road : "name of the road",
 *      roadNume : "number of the road",
 *      roadExtra : "extra of the road",
 *      zipcode : "zipcode",
 *      city : "city",
 *      reference : "reference of the project",
 *      projectName : "name of the project"}
 * Body response {message : "Ok",
 *      project : "JSON project"}
 */
exports.createProject = function (req, res) {
    if (req.body.userID === undefined ||
        req.body.date === undefined ||
        req.body.road === undefined ||
        req.body.roadNum === undefined ||
        req.body.roadExtra === undefined ||
        req.body.zipcode === undefined ||
        req.body.customerID === undefined ||
        req.body.city === undefined ||
        req.body.reference === undefined ||
        req.body.projectName === undefined) {

        res.status(400).json({message: "bad request"});
    }

    User.findOne({_id: req.body.userID}, (error, userRes) => {
        if (error) {
            res.status(500).json({message: "error"});
        }

        let project = {
            "user":
                {
                    "id": userRes._id.toString(),
                    "incharge": true,
                    "matricule": userRes.matricule
                },
            "invoice": [],
            "payement": [],
            "estimation": [],
            "reference": req.body.reference,
            "name": req.body.projectName,
            "date": new Date(req.body.date),
            "road": req.body.road,
            "roadNum": req.body.roadNum,
            "zipcode": req.body.zipcode,
            "city": req.body.city,
            "roadExtra": req.body.roadExtra,
            "customer": req.body.customerID,
            "projectName" : req.body.projectName
        };
        console.log(project);
        _p = new Project(project);

        _p.save((error2, result) => {
            if (error2) {
                res.status(500).json({message: "internal error"});
            } else {
                res.status(200).json({message: "ok", project: result});
            }
        })
    });
};

/**
 * This function delete a project
 * @name Delete Project
 * @param{JSON} req
 * @param {JSON} res
 * @param {String} projectID
 * @returns {JSON} return message "Ok"
 * @example Body request {projectID : "Project ID"}
 * Body response {message : "Ok"}
 */
exports.deleteProject = function(req, res){
    if(req.body.projectID === undefined){
        res.status(400).json({message : "bad request"});
    }

    Project.remove({_id : req.body.projectID}, (error, result)=>{
        if(error){
            res.status(500).json({message : "internal error"});
        }

        res.status(200).json({message : "ok"});
    });
};

/**
 * This function get all project
 * @name Get all project
 * @param{JSON} req
 * @param {JSON} res
 * @returns {JSON} return a new password
 * @example GET REQUEST
 * Body response {message : "Ok",
 *      projects : "JSON of all project"}
 */
exports.getallproject = function (req, res) {
    Project.find({}, (err, result) => {
        if (err) {
            res.status(500).json({message: "internal error"});
        } else {
            res.status(200).json({message: "ok", projects: result});
        }
    })
};

/**
 * This function get one project with ID
 * @name Get Project By ID
 * @param{JSON} req
 * @param {JSON} res
 * @param {String} projectID
 * @returns {JSON} return a project and his customer
 * @example Body request {projectID : "Project ID"}
 * Body response {message : "Ok",
 *      result : "JSON project",
 *      customer : "JSON customer"}
 */
exports.getprojectbyid = function (req, res) {
    if (req.body.projectID === undefined) {
        res.status(400).json({message: "bad request"});
    }

    Project.findOne({_id: req.body.projectID}, (error, result) => {
        if (error) {
            res.status(500).json({message: "internal error"});
        }

        Customer.findOne({_id: result.customer}, (error2, result2) => {
            if (error2) {
                res.status(500).json({message: "internal error"});
            }

            res.status(200).json({
                message: "ok",
                result: result,
                customer: result2
            })
        })
    })
};

exports.updateProject = function (req, res) {
    if (req.body.userID === undefined ||
        req.body.road === undefined ||
        req.body.roadNum === undefined ||
        req.body.roadExtra === undefined ||
        req.body.zipcode === undefined ||
        req.body.customerID === undefined ||
        req.body.city === undefined ||
        req.body.reference === undefined ||
        req.body.projectName === undefined ||
        req.body.projectID === undefined) {

        res.status(400).json({message: "bad request"});
    }
    User.findOne({_id: req.body.userID}, (error, userRes) => {
        if (error) {
            res.status(500).json({message: "error"});
        }
        let project = {
            "user":
                {
                    "id": userRes._id,
                    "incharge": true,
                    "matricule": userRes.matricule
                },
            "reference": req.body.reference,
            "name": req.body.projectName,
            "road": req.body.road,
            "roadNum": req.body.roadNum,
            "zipcode": req.body.zipcode,
            "city": req.body.city,
            "roadExtra": req.body.roadExtra,
            "customer": req.body.customerID,
            "projectName" : req.body.projectName
        };

        Project.updateOne({_id: req.body.projectID}, {$set:project}, (error, result) => {
            if (error) {
                res.status(500).json({message: "internal error"});
            } else {
                res.status(200).json({message: "ok", project: result});
            }
        })
    });
};
