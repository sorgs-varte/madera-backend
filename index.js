const express = require('express');
const fs = require('fs');
const http = require('http');
const conf = require('./config');
const path = require('path');
//const privateKey  = fs.readFileSync('./server.key', 'utf8');
//const certificate = fs.readFileSync('./server.crt', 'utf8');
//const credentials = {key: privateKey, cert: certificate};

const app = express();
const router = require('./router');
const mongoose = require('mongoose');
//'mongodb+srv://$[username]:$[password]@$[hostlist]/$[database]?retryWrites=true';
mongoose.connect('mongodb://'+conf.dbUser+":"+conf.password+"@"+conf.dbpath,{useNewUrlParser:true});
//app.use(morgan('combined'));
const port = 8080;
const httpServer = http.createServer(app);

app.use(express.static('docs'));
router(app);


httpServer.listen(port);
console.log('Server listening  on:', port);

module.exports = app;
