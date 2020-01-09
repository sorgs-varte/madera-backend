const routeTest = require('./controler/routeTest');
const madera_cut = require('./controler/madera_cut');
const madera_project = require('./controler/madera_project');
const madera_estimation = require('./controler/madera_estimation');
const madera_module = require('./controler/madera_module');
const madera_customer = require('./controler/madera_customer');
const madera_component = require('./controler/madera_component');
const madera_range = require('./controler/madera_range');
const madera_payement = require('./controler/madera_payement');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const express = require('express');
require('./services/passport');
const requireAuth = passport.authenticate('jwt', { session : false });
const requireSignin = passport.authenticate('local', { session: false });
const fs = require('fs');


module.exports = function (app) {

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:443');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);

        next();
    });

    app.use(cors());
    app.use(bodyParser({limit: '500mb'}));
    app.use(bodyParser.json({type: '*/*'}));
    app.use(bodyParser.json({limit: '500mb'}));
    app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));

    app.get('/assets/:name', function (req, res) {
        let name = req.params.name;

        fs.readFile('/home/anthony/node/back_meetup/docs/assets/'+name, function (err, file) {
            //console.log(file);
            if(err){
                res.status(500).json({message : "error"});
            }
            let strFile = file.toString();
            //console.log(strFile);
            res.send(file);
        });
    });
    app.post("/v1/test", routeTest.test);
    app.get('/', routeTest.fenetrebase);
    app.get('/v1/plop', routeTest.plop);
    app.get('/docs', routeTest.docs);

    app.post('/v1/login', routeTest.login);
    app.post('/v1/signup', routeTest.signup);
    app.post('/v1/changepass', requireAuth, routeTest.changePass);
    app.post('/v1/getuserbyid', requireAuth, routeTest.getUserById);

    app.post('/v1/createproject', requireAuth, madera_project.createProject);
    app.post('/v1/deleteproject', requireAuth, madera_project.deleteProject);
    app.post('/v1/getprojectbyid', requireAuth, madera_project.getprojectbyid);
    app.post('/v1/updateproject', requireAuth, madera_project.updateProject);
    app.get('/v1/getallproject', requireAuth, madera_project.getallproject);

    app.post('/v1/deleteestimation', requireAuth, madera_estimation.deleteEstimation);
    app.post('/v1/modifyestimation', requireAuth, madera_estimation.modifyEstimation);
    app.post('/v1/getestimationbyid', requireAuth, madera_estimation.getestimationbyid);
    app.post('/v1/createestimation', requireAuth, madera_estimation.createEstimation);
    app.post('/v1/updateestimationdiscount', requireAuth, madera_estimation.updateEstimationDiscount);
    app.post('/v1/updateestimationstate', requireAuth, madera_estimation.updateStateEstimation);
    app.post('/v1/updateestimationfloor', requireAuth, madera_estimation.updateFloorEstimation);
    app.post('/v1/updateestimationprice', requireAuth, madera_estimation.updatePriceEstimation);

    app.post('/v1/createmodule', requireAuth, madera_module.createModule);
    app.post('/v1/createmodulebasic', requireAuth, madera_module.createModuleBasic);
    app.post('/v1/createmodulewithestimation', requireAuth, madera_module.createModuleWithEstimationID);
    app.post('/v1/getmodulebyid', requireAuth, madera_module.getModuleById);
    app.post('/v1/createmodulewithcomponents', requireAuth, madera_module.createModuleEstimationWithComponents);
    app.post('/v1/addmoduletoestimation', requireAuth, madera_module.addModuleToEstimation);
    app.post('/v1/deletemoduleonestimation', requireAuth, madera_module.deleteModuleOnEstimation);
    app.post('/v1/updateModule', requireAuth, madera_module.updateModule);
    app.get('/v1/getallmodule', requireAuth, madera_module.getAllModule);
    app.get('/v1/getallmodulemodel', requireAuth, madera_module.getAllModuleTypeModel);
    app.post('/v1/getmodulebyestimation', requireAuth, madera_module.getModuleByEstimation);

    app.post('/v1/createcustomer', requireAuth, madera_customer.createCustomer);
    app.post('/v1/updatecustomer', requireAuth, madera_customer.updateCustomer);
    app.get('/v1/getallcustomer', requireAuth, madera_customer.getallcustomer);
    app.post('/v1/getcustomerbyid', requireAuth, madera_customer.getCustomerById);

    app.post('/v1/createcomponent', requireAuth, madera_component.createComponent);
    app.post('/v1/getcomponentbyid', requireAuth, madera_component.getComponentById);
    app.post('/v1/addcomponenttomodule', requireAuth, madera_component.addComponentToModule);
    app.get('/v1/getallcomponent', requireAuth, madera_component.getAllComponent);

    app.post('/v1/createrange', requireAuth, madera_range.createRange);
    app.post('/v1/deleterange', requireAuth, madera_range.deleteRange);
    app.post('/v1/getrangebyid', requireAuth, madera_range.getRangeByID);
    app.get('/v1/getallrange', requireAuth, madera_range.getAllRange);

    app.post('/v1/getTimeByTask', routeTest.getTimeByTask);
    app.post('/v1/getTaskByName', routeTest.getTaskByName);
    app.post('/v1/postTime', routeTest.sendTime);
    app.get('/v1/getTask', routeTest.getTask);
    app.get('/v1/getFinal', requireAuth, routeTest.getFinal);

    app.post('/v1/getpayementbyid', requireAuth, madera_payement.getPayementById);
    app.post('/v1/createpayement', requireAuth, madera_payement.createPayement);

    app.post('/v1/createcut', requireAuth, madera_cut.createCut);
    app.get('/v1/getallcut', requireAuth, madera_cut.getAllCut);
};