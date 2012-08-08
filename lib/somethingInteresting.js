var dependency = require('./dependency');

module.exports.funkytion = function funkytion (callback) {
  dependency(function (err, result) {
    if (err) callback(err);
    else {
      result = result + ' KnowwhatI\mtalkinabout?';
      callback(null, result);
    }
  })
}