let Book = require('../routes/device');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('/GET book', () => {
  it('it should GET all the books', (done) => {
    chai.request(server)
        .get('/book')
        .end((err, res) => {
              res.should.have.status(200);
          done();
        });
  });
});

