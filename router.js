const routeTest = require('./controler/routeTest');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./services/passport');
const requireAuth = passport.authenticate('jwt', { session : false });
const requireSignin = passport.authenticate('local', { session: false });


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


    app.get('/v1/plop', requireAuth, routeTest.plop);

    app.post('/v1/login', routeTest.login);

    app.post('/v1/signup', routeTest.signup);

    app.post('/v1/postTime', requireAuth, routeTest.sendTime);

    app.post('/1/postTimeComplet', requireAuth, routeTest.sendTimeDone);

    app.get('/v1/getTask', requireAuth, routeTest.getTask);
};