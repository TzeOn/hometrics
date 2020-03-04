process.env.NODE_ENV = "test"

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/main');
const should = chai.should();
chai.use(chaiHttp)


//works
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});


//dont work
describe('/POST user', () => {
  it('it sould post the user info', (done) => {
      const user = {
          emailAddress: "lee@hooli.com",
          password: "lee_password",
          device: "d1"
      };
      chai.request('http://localhost:5000')
      .post('server/routes/device/getDateTime')
      .send(user)
      .end((err, res) => {
        console.log(res)
        should.exist(res);
          res.should.have.status(200);
          
          done();
      });
  });
});


