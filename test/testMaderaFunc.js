let request = require('supertest');
let app = require('../index.js');


describe('GET /plop', function() {
    it('respond with ok', function(done) {
        request(app).get('/v1/plop').expect('ok', done);
    });
});

describe('POST /plop', function() {
    it('respond with error', function(done) {
        request(app).post('/v1/plop').expect('<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Error</title>\n</head>\n<body>\n<pre>Cannot POST /v1/plop</pre>\n</body>\n</html>\n', done);
    });
});

describe('POST /v1/login', function () {
    it('respond with 200', function (done) {
        request(app)
            .post('/v1/login')
            .send({matricule: 'FIGUEA0691', password : "dede"})
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    })
});

describe('POST /v1/login', function () {
    it('respond with 401 bad password', function (done) {
        request(app)
            .post('/v1/login')
            .send({matricule: 'FIGUEA0691', password : "plop"})
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    })
});

describe('POST /v1/login', function () {
    it('respond with 401 bad matricule', function (done) {
        request(app)
            .post('/v1/login')
            .send({matricule: 'FIGUEA069', password : "dede"})
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    })
});

describe('POST /v1/login', function () {
    it('respond with 400 empty body', function (done) {
        request(app)
            .post('/v1/login')
            .send({})
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    })
});

describe('GET /v1/login', function () {
    it('respond with 404', function (done) {
        request(app)
            .get('/v1/login')
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    })
});

describe('GET /v1/getallmodule', function () {
    it('respond with 200', function (done) {
        request(app)
            .get('/v1/getallmodule')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZGE2ZTNkNmIyZGQ4NTFjMTdiNzE2YzkiLCJpYXQiOjE1Nzc5MjQ1NDM3MTZ9.GfyhpuApaHSFZt-widJOVZ-DxG1PujqSDoWuye6zmNs')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    })
});

describe('GET /v1/getallmodule', function () {
    it('respond with 401 bad token', function (done) {
        request(app)
            .get('/v1/getallmodule')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'eyJ0eXAiOiJK')
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    })
});

describe('POST /v1/getallmodule', function () {
    it('respond with 404', function (done) {
        request(app)
            .post('/v1/getallmodule')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZGE2ZTNkNmIyZGQ4NTFjMTdiNzE2YzkiLCJpYXQiOjE1Nzc5MjQ1NDM3MTZ9.GfyhpuApaHSFZt-widJOVZ-DxG1PujqSDoWuye6zmNs')
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    })
});

