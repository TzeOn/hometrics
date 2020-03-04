
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../routes/device');
let should = chai.should();

chai.use(chaiHttp);

var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('/POST device', () => {
  it('test', (done) => {
    chai.request(server)
        .post('/getDateTime')
        .end((err, res) => {
              res.should.have.status(200);
          done();
        });
  });
});

