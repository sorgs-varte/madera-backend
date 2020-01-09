
const User = require('../schema/User');
const Task = require('../schema/Task');
const config = require('../config');
const passwordHash = require("password-hash");
const jwt = require('jwt-simple');
const fs = require('fs');


function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp}, config.secret);
}

exports.plop = function (req, res) {
    res.send("ok");
};

exports.docs = function(req, res){
    //res.writeHead(200, {'Content-Type': 'text/html'});
    //console.log(__dirname);

    fs.readFile('/home/anthony/node/back_meetup/docs/index.html', function (err, file) {
        //console.log(file);
        let strFile = file.toString();
        //console.log(strFile);
        res.send(strFile);
    });

};

exports.test = function (req, res) {
    //console.log(req.body);
    res.send("ok");
};

/**
 * This is the login function
 * @name Login
 * @param{JSON} req
 * @param {JSON} res
 * @param {String} matricule
 * @param {String} password
 * @returns {JSON} return a token if the login is OK
 * @example Body request {matricule : "MATRI0101", password : "password"}
 * Body response {token : "tokenString",
 *      text : "Authentification réussi",
 *      user : "User JSON",
 *      email : "User's email"}
 */
exports.login = function (req, res) {
    //console.log(req.body);
    if (!req.body.matricule || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        User.findOne({
            matricule: req.body.matricule
        }, function (err, user) {
            if (err) {
                res.status(500).json({
                    "text": "Erreur interne"
                })
            }
            else if (!user) {
                res.status(401).json({
                    "text": "L'utilisateur n'existe pas"
                })
            }
            else {
                if (user.authenticate(req.body.password)) {
                    res.status(200).json({
                        "token": tokenForUser(user),
                        "text": "Authentification réussi",
                        "user":user,
                        "email":req.body.email
                    })
                }
                else {
                    res.status(401).json({
                        "text": "Mot de passe incorrect"
                    })
                }
            }
        })
    }
};
/**
 * This function change a password of an user
 * @name Change password
 * @param{JSON} req
 * @param {JSON} res
 * @param {String} matricule
 * @param {String} passModif
 * @returns {JSON} return a new password
 * @example Body request {matricule : "MATRI0101", passModif : "Secret key"}
 * Body response {message : "Ok",
 *      pass : "Generated password"}
 */
exports.changePass = function(req, res){
    if(!req.body.matricule &&
        !req.body.passModif){
        res.status(400).json({
            "text": "Requête invalide"
        })
    }else{

        if(req.body.passModif === "nofuckingphp"){
            let password = generatePass();
            let hashpass = passwordHash.generate(password);

            User.updateOne({matricule : req.body.matricule},
                {$set : {password : hashpass}},
                (error, result)=>{
                    if(error){
                        res.status(500).json({
                            "text": "Erreur interne"
                        })
                    }else{

                        res.status(200).json({
                            "text": "ok",
                            "pass": password
                        })
                    }
                })
        }else{
            res.status(401).json({
                "text": "vous n'êtes pas authorisé a faire ça"
            })
        }
    }
};

exports.signup = function(req, res) {
    //console.log(req.body);
    if (!req.body.role ||
        !req.body.matricule ||
        !req.body.email ||
        !req.body.password ||
        !req.body.nom ||
        !req.body.prenom) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {

        /*let matricule = "";
        if(req.body.nom.length > 5){
            matricule = req.body.nom.substring(0,5)+req.body.prenom.substring(0, 1);
        }else{
            matricule = req.body.nom;
        }*/


        let user = {
            email: req.body.email,
            matricule : req.body.matricule,
            password: passwordHash.generate(req.body.password),
            nom: req.body.nom,
            prenom: req.body.prenom,
            role : req.body.role
        };

        console.log(user);
        let findUser = new Promise(function (resolve, reject) {
            User.findOne({
                matricule: user.matricule
            }, function (err, result) {
                if (err) {
                    reject(500);
                } else {
                    if (result) {
                        reject(204)
                    } else {
                        resolve(true)
                    }
                }
            })
        });
        console.log('find user then');
        findUser.then(function () {
            let _u = new User(user);
            _u.save(function (err, user) {
                if (err) {
                    console.log('fail saving');
                    console.log(err);
                    res.status(500).json({
                        "text": "Erreur interne first"
                    })
                } else {

                    res.status(200).json({
                        "text": "Succès",
                        "token": tokenForUser(user),
                        "user" : user
                    });
                }
            })
        }, function (error) {
            switch (error) {
                case 500:
                    console.log('fail find one');
                    res.status(500).json({
                        "text": "Erreur interne switch"
                    });
                    break;
                case 204:
                    res.status(204).json({
                        "text": "L'adresse email existe déjà"
                    });
                    break;
                default:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
            }
        })
    }
};

exports.sendTime = function (req, res) {
    console.log(req.body);
    if (req.body.nom === undefined
        || req.body.time === undefined
        || req.body.task === undefined) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.send({
            "text": "Requête invalide"
        })
    } else {
        console.log("requete ok");
        let dataBegin = new Date();

        let task = {
            userId : req.body.nom,
            time : req.body.time,
            task : req.body.task,
            date : dataBegin
        };

        let _t = new Task(task);
        _t.save(function (err, taskReturn) {
            if (err) {
                console.log('fail saving');
                console.log(err);
                res.send({
                    "text": "Erreur interne first"
                })
            } else {
                console.log("ok");
                res.send({
                    "text": "Succès",
                    "task": taskReturn
                });
            }
        })
    }
};

exports.getTask = function (req, res) {
    console.log(req.body);
    Task.find({}, function (err, tasks) {
        if (err) {
            res.send({
                "message":"internal error"
            })
        }
        res.send({
            "message":"ok",
            "tasks": tasks
        });
    })
};

exports.fenetrebase = (req, res)=>{
    res.send("<html>" +
        "<head>" +
        "    <meta charset=\"UTF-8\">" +
        "    <title>Index Madera</title>" +
        "</head>" +
        "<body>" +
        "bloup bloup" +
        "</body>" +
        "</html>");
};

exports.getTaskByName = (req, res) => {
    if(req.body.nom === undefined){
        res.status(400).json({message : "request error"});
    }

    Task.find({userId : req.body.nom}, (err, tasks)=> {
        if(err){
            res.status(500).json({message : "internal error"});
        }
        let timeTotal  = 0;
        for(let i = 0; i < tasks.length ; i++){
            if(tasks[i].time.includes(",")){
                tasks[i].time.replace(",", ".");
            }
            timeTotal+= Number(tasks[i].time);
        }
        res.status(200).json({
            message : "ok",
            tasks : tasks,
            total : timeTotal
        });
    })
};

exports.getTimeByTask = (req, res)=>{
    if(req.body.task === undefined){
        res.status(400).json({message : "request error"});
    }
    let task = req.body.task;
    Task.find({task : req.body.task}, (err, tasks)=> {
        if(err){
            res.status(500).json({message : "internal error"});
        }
        let time = 0;
        let names = [];
        let full = [];
        tasks.forEach(task => {
            if(names.includes(task.userId)){
                console.log("deja dans la liste");
            }else{
                names.push(task.userId);
                full.push({
                    name : task.userId,
                    time : 0
                });
            }
        });

        tasks.forEach(task => {
            if(task.time.includes(",")){
                let tab = task.time.split(',');
                task.time = tab[0]+'.'+tab[1];
            }
        });

        for(let i = 0 ; i < full.length ; i++){
            tasks.forEach(task =>{
                if(full[i].name === task.userId){
                    full[i].time += Number(task.time);
                }
            });
        }
        res.status(200).json({
            message : "ok",
            timePerName : full,
            task : task
        })
    })
};


function generatePass(){
    let alphabeta = ['a', 'b', 'c', 'd', 'e',
        'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o',
        'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y',
        'z', '1', '2', '3', '4',
        '5', '6', '7', '8', '9'];
    let pass = "";
    for(let i = 0 ; i < 9; i++){
        pass += alphabeta[((Math.random()* Math.floor(35))).toFixed(0)];
    }

    //console.log(pass);
    return pass;
}
/**
 * This function get an user by his ID
 * @name Get User By ID
 * @param{JSON} req
 * @param {JSON} res
 * @param {String} userId
 * @returns {JSON} return an user
 * @example Body request {matricule : "MATRI0101", passModif : "Secret key"}
 * Body response {message : "Ok",
 *      user : "JSON User find"}
 */
exports.getUserById = function (req, res) {
    if(req.body.userID === undefined){
        res.status(400).json({message : "bad request"});
    }else{
        User.findOne({_id : req.body.userID}, (error, result)=>{
            if(error){
                res.status(500).json({message : "internal error"});
            }else{
                res.status(200).json({message : "ok", user : result});
            }
        })
    }
};

exports.getFinal = function (req, res) {
    Task.find({}, function (error, tasks) {
        if(error){
            res.status(500).json({message : "internal error"});
        }else{
            let final = {
                anthony : {tasks:[], total : 0},
                robin : {tasks:[], total : 0},
                aurelien : {tasks:[], total : 0},
                nicolas : {tasks:[], total : 0}
            };

            let exStruc = {
                task : "",
                time : 0
            };
            tasks.forEach(task =>{
                if(task.userId === 'anthony'){
                    if(final.anthony.tasks.length === 0){
                        final.anthony.tasks.push({
                            task : task.task,
                            time : Number(task.time)
                        });
                        final.anthony.total += Number(task.time);
                    }else{
                        let newTask = false;
                        for(let i = 0 ; i< final.anthony.tasks.length; i++){
                            if(final.anthony.tasks[i].task === task.task){
                                newTask = false;
                                final.anthony.tasks[i].time = final.anthony.tasks[i].time + Number(task.time);
                                final.anthony.total += Number(task.time);
                                break;
                            }else{
                                newTask = true;
                            }
                        }
                        if(newTask){
                            final.anthony.tasks.push({
                                task : task.task,
                                time : Number(task.time)
                            });
                            final.anthony.total += Number(task.time);
                        }
                    }
                }else if(task.userId === 'robin'){
                    if(final.robin.tasks.length === 0){
                        final.robin.tasks.push({
                            task : task.task,
                            time : Number(task.time)
                        });
                        final.robin.total += Number(task.time);
                    }else{
                        let newTask = false;
                        for(let i = 0 ; i< final.robin.tasks.length; i++){
                            if(final.robin.tasks[i].task === task.task){
                                newTask = false;
                                final.robin.tasks[i].time = final.robin.tasks[i].time + Number(task.time);
                                final.robin.total += Number(task.time);
                                break;
                            }else{
                                newTask = true;
                            }
                        }
                        if(newTask){
                            final.robin.tasks.push({
                                task : task.task,
                                time : Number(task.time)
                            });
                            final.robin.total += Number(task.time);
                        }
                    }
                }else if(task.userId === 'aurelien'){
                    if(final.aurelien.tasks.length === 0){
                        final.aurelien.tasks.push({
                            task : task.task,
                            time : Number(task.time)
                        });
                        final.aurelien.total += Number(task.time);
                    }else{
                        let newTask = false;
                        for(let i = 0 ; i< final.aurelien.tasks.length; i++){
                            if(final.aurelien.tasks[i].task === task.task){
                                newTask = false;
                                final.aurelien.tasks[i].time = final.aurelien.tasks[i].time + Number(task.time);
                                final.aurelien.total += Number(task.time);
                                break;
                            }else{
                                newTask = true;
                            }
                        }
                        if(newTask){
                            final.aurelien.tasks.push({
                                task : task.task,
                                time : Number(task.time)
                            });
                            final.aurelien.total += Number(task.time);
                        }
                    }
                }else if(task.userId === 'nicolas'){
                    if(final.nicolas.tasks.length === 0){
                        final.nicolas.tasks.push({
                            task : task.task,
                            time : Number(task.time)
                        });
                        final.nicolas.total += Number(task.time);
                    }else{
                        let newTask = false;
                        for(let i = 0 ; i< final.nicolas.tasks.length; i++){
                            if(final.nicolas.tasks[i].task === task.task){
                                newTask = false;
                                final.nicolas.tasks[i].time = final.nicolas.tasks[i].time + Number(task.time);
                                final.nicolas.total += Number(task.time);
                                break;
                            }else{
                                newTask = true;
                            }
                        }
                        if(newTask){
                            final.nicolas.tasks.push({
                                task : task.task,
                                time : Number(task.time)
                            });
                            final.nicolas.total += Number(task.time);
                        }
                    }
                }
            });
            res.status(200).json({message : "ok", final : final});
        }
    })
};