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

