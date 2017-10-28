// NOTE: It is totally possible to combine Mocha and Karma+Jasmine, especially if Mocha is used to test some node server-side or desktop node code (ie: code that affects the filesystem)

const sayModuleLocalDir = __dirname + "\\..\\lib\\Say";
console.log(sayModuleLocalDir);

var { Say } = require( sayModuleLocalDir );


// This spec will use async/await to:
// Ensure a series of await calls complete as expected.
// Ensure await (Promise) errors are handled.
// [TODO]


// This spec will use Promises to:
// 1. Try to stop text-to-speech (tts) and fail
// 2. Start tts
// 3. Try to start another tts while tts is already running and fail
// 4. Stop active tts midsentence

// // Say "Hello, ...". It should resolve when done or when it has been stopped.
// sayHello().then(() => {
//     console.log('Done talking.');
// }).catch((err) => {
//     console.error(err);
// });

// // After 1 second try to say "Hello, ..." again. It should reject with a custom Error.
// setTimeout(function() {
//     sayHello().then(() => {
//         console.log('Done talking.');
//     }).catch((err) => {
//         console.error(err);
//     });
// }, 1000);

// // After 2 seconds stop the active tts. It should resolve when stopped and the active "Hello, ..." tts should stop mid-sentence and immediately resolve itself.
// setTimeout(function() {
//     Say.stop().then(() => {
//         console.log('Stopped active text to speech.');
//     }).catch((err) => {
//         console.error(err);
//     });
// }, 2000);


/**
 * Says "Hello"
 * @returns {*a Promise} Promise(resolve, reject)
 */
function sayHello() {
    return Say.speak('Hello, how are you today?');
};




// MOCHA SPEC INSTEAD OF JASMINE BECAUSE TESTING NODE ON THE FILESYSTEM RATHER THAT BROWSER-BASED

var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
describe('Say', function() {
    describe('on stop talking when no active tts is running', function() {
        it('should reject with a custom Error', function() {
            Say.stop().catch((err) => {
                assert.equal(typeof err, 'Error');
            });
        });
    });
});


// // NOTE: WAS USING KARMA+JASMINE BUT IT WAS A BAD CHOICE FOR THIS PROJECT THAT USES NODE TO WORK WIHT THE FILESYSTEM BECAUSE THERE IS NO BROWSER INVOLVED

// // Karma/jasmine setup
// // 1. Follow karma installation instructions (I did not install karma-cli globally): http://karma-runner.github.io/1.0/intro/installation.html
// // 2. Follow additional karma-browserify instructions if getting errors from "require" (read all the comments, too): https://stackoverflow.com/a/30781687/285714
//    // Since I don't really need a browser I may want to consider Mocha.


// /**
//  * Unit tests for lib/pomodoro.js
//  */
// describe('Pomodoro', function() {
    
//     it('should show .pomodoro file contents on init', function() {
//         expect(1).toEqual(1);
//     });

// });