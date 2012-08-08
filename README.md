node_hands_on-unit_testing
==========================

What we're gonna do: 
- Learn what Mocha is
- Learn how to get Mocha
- Learn how to use Mocha
- Learn what MockRequire is
- Learn how to get MockRequire
- Learn how to use MockRequire with Mocha

What is Mocha?
--------------

From http://visionmedia.github.com/mocha/ :

Mocha is a feature-rich JavaScript test framework running on node and the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases

It's (IMHO) the most fully featured, easiest to use testing framework for Node. It rocks. 

Get yoself some Mocha!
---------------------

install it

```bash
npm install mocha -g
```

create a project & package.json

```bash
MacBookPro-MWW:node_hands_on-unit_testing matt$ vim package.json 
```

add it to the project

```json
...
"dependencies": {},
  "devDependencies": {
    "mocha": "*",
    "should": "*"
  },
...
```

install your dependencies

```bash
MacBookPro-MWW:node_hands_on-unit_testing matt$ npm install
npm http GET https://registry.npmjs.org/should
npm http GET https://registry.npmjs.org/mocha
npm http 304 https://registry.npmjs.org/mocha
npm http GET https://registry.npmjs.org/mocha/-/mocha-1.3.2.tgz
npm http 200 https://registry.npmjs.org/should
npm http GET https://registry.npmjs.org/should/-/should-1.1.0.tgz
npm http 200 https://registry.npmjs.org/mocha/-/mocha-1.3.2.tgz
npm http 200 https://registry.npmjs.org/should/-/should-1.1.0.tgz
npm http GET https://registry.npmjs.org/commander/0.6.1
npm http GET https://registry.npmjs.org/growl
npm http GET https://registry.npmjs.org/jade/0.26.3
npm http GET https://registry.npmjs.org/diff/1.0.2
npm http GET https://registry.npmjs.org/debug
npm http 304 https://registry.npmjs.org/debug
npm http 304 https://registry.npmjs.org/commander/0.6.1
npm http 304 https://registry.npmjs.org/growl
npm http 304 https://registry.npmjs.org/diff/1.0.2
npm http 200 https://registry.npmjs.org/jade/0.26.3
npm http GET https://registry.npmjs.org/jade/-/jade-0.26.3.tgz
npm http 200 https://registry.npmjs.org/jade/-/jade-0.26.3.tgz
npm http GET https://registry.npmjs.org/mkdirp/0.3.0
npm http 304 https://registry.npmjs.org/mkdirp/0.3.0
should@1.1.0 ./node_modules/should 
mocha@1.3.2 ./node_modules/mocha 
├── growl@1.5.1
├── commander@0.6.1
├── debug@0.7.0
├── diff@1.0.2
└── jade@0.26.3
```

and you're ready to rock. we'll be using both mocha and should in our tests.

```bash
MacBookPro-MWW:node_hands_on-unit_testing matt$ ls node_modules/
mocha  should
```

So, what do we do with this thing?
--------------

We teeeeeeeeeeest

1. Note Mocha assumes all your tests live under a ./test directory. Be sure to 'mkdir test' and place your test .js files here

###simple: 

Create a file called ./test/simple.js and place the following in it:

```javascript
require('should');
describe('Array', function () {
  var arr = [1,2,3];
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      arr.indexOf(5).should.equal(-1);
      arr.indexOf(0).should.equal(-1);
    });
  });
});
```
Next, run ```mocha```. You should see the following output: 

```bash
$ mocha

  ....

  ✔ 1 test complete (1ms)
```

###So, what did we just do?

####describe

mocha's describe method creates the function scope under which we're going to test some code. We're testing an Array. We're also testing the indexOf() function. 

####Should

should is a node module that extends Object and adds neat properties and methods to Object.prototype, allowing you to do interesting comparisons and assertions. It helps you test that values are what you want them to be (or not what you don't). To learn more about should, read the README (https://github.com/visionmedia/should.js/blob/master/Readme.md) or just look at the code directly and see how it works (https://github.com/visionmedia/should.js/blob/master/lib/should.js#L302).

We just used it to perform two assertions inside of our describe blocks. When should methods fail a comparison, they throw an error. Had they thrown an error here, out test would have failed. 

###What about asynchronous methods?

For testing async methods, mocha lets you pass a 'done' callback variable which you call when your test has completed. 

```javascript
describe('User', function () {
  describe('#save()', function () {
    it('should save without error', function (done) {
      var user = new User('Luna');
      user.save(function (err) {
        if (err) throw err;
        // we done. call it!
        done();
      });
    });
  });
});
```

The done callback will also throw if you pass it an error as the first param, and will otherwise consider success if you pass it anything else as the second param. As a result, you can just pass it in as a callback variable and let it do its magic.

```javascript
describe('User', function () {
  describe('#save()', function () {
    it('should save without error', function (done) {
      var user = new User('Luna');
      // we done when the user says so. let him call it!
      user.save(done);
    })
  })
})
```

###What about functions/classes with dependencies?

On platforms like Java and .NET, dependency injection and Inversion of Control are popular topics. Why? Because by passing in fully instantiated dependencies, we don't get into a scenario where we can't easily mock out some dependency class/function, forcing us to test against a database or API where we'd rather use a stub. 

Most node code ```require()```s dependencies atop or within a module. Rarely do you find an IOC style of code used where dependencies are passed into a constructor. 

So, how do you unit test code in a way that isolates it from its dependencies? MockRequire can help you. (https://github.com/mateodelnorte/mockrequire)

MockRequire lets you specify a json hash of required dependency names and stubs that you would like executed, instead of what would have otherwise been required. 

```javascript
var mockrequire = require('mockrequire');

describe('somethingInteresting', function () {

  somethingInteresting = mockrequire('../lib/somethingInteresting', {
    './dependency': function (callback) { callback(null, 'test'); }
  });

  describe('#funkytion', function () {
    it('should return what we say, and *like* it!', function (done) {
      somethingInteresting.funkytion(function (err, result) {
        result.should.eql('test KnowwhatI\mtalkinabout?');
        done();
      });
    });
  });
});
```

In the above example, we load a stub for the 'dependency' and stub out a method to be executed instead of the real one. Imagine that the 'dependency' function made a call against an API that cost money. Now we can keep our pocketbook closed while we test. ;)

###Mmmm. Cool. What about APIs 'n' Integration 'n' Stuff?

Easy answer: ```require('http');``` You can always ping your APIs with http and https (or a module like ```superagent```) requests and assert their responses against what you would expect: 

```javascript
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
```

###Nice. So I start my API in one terminal, then run the tests in another?

##Heeeeeells no! Let's get Olde Schoole

###```Make```ing Life Easier

