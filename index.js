const express = require('express');
//const https = require('spdy');
//const cors=require('cors');
//const morgan = require('morgan');
//const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
//const privateKey  = fs.readFileSync('./server.key', 'utf8');
//const certificate = fs.readFileSync('./server.crt', 'utf8');
//const credentials = {key: privateKey, cert: certificate};

const app = express();
const router = require('./router');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/test_meetup',{useNewUrlParser:true});
//app.use(morgan('combined'));
const port = 443;
const httpServer = http.createServer(app);

router(app);

httpServer.listen(port);
console.log('Server listening  on:', port);
