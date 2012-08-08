require('should');

function User () { }

User.prototype.save = function save (cb) {
  cb();
}

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      [1,2,3].indexOf(5).should.equal(-1);
      [1,2,3].indexOf(0).should.equal(-1);
    });
  });
});

describe('User', function () {
  describe('#save()', function () {
    it('should save without error', function (done) {
      var user = new User('Luna');
      user.save(function (err) {
        if (err) throw err;
        done();
      });
    });
  });
});

describe('User', function () {
  describe('#save()', function () {
    it('should save without error', function (done) {
      var user = new User('Luna');
      user.save(done);
    })
  })
})