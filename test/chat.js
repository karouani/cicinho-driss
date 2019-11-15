process.env.NODE_ENV = "test"

const ChatApplication = require('../models/appModel');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('/GET user', () => {
    it('it should Get all users', (done) => {
        chai.request(app)
            .get('/chat/allusers')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Array');
                done();
            });
    });
});