require('should');

var somethingInteresting = require('../lib/somethingInteresting');

describe('somethingInteresting', function () {
  describe('#funkytion', function () {
    it('should return the value from the dependency', function (done) {
      somethingInteresting.funkytion(function (err, result) {
        result.should.eql('I really don\'t want to have to call this method. What if it was an external API? KnowwhatI\mtalkinabout?');
        done();
      });
    });
  });
});

var mockrequire = require('mockrequire');

mockrequire('../lib/somethingInteresting');

describe('somethingInteresting', function () {
  describe('#funkytion', function () {
    it('should return what we say, and *like* it!', function (done) {
      somethingInteresting.funkytion(function (err, result) {
        result.should.eql('I really don\'t want to have to call this method. What if it was an external API? KnowwhatI\mtalkinabout?');
        done();
      });
    });
  });
});


