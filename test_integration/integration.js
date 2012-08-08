require('should');

var util = require('util');

var superagent = require('superagent');

describe('our_little_api', function () {
  describe('#GET /funk', function () {
    it('should return the funk', function (done) {
      superagent.get('http://localhost:3000/funk', function (res) {
        res.should.have.property('body').eql({ YouGotThe: 'funk' });
        done();
      });
    });
  });
});