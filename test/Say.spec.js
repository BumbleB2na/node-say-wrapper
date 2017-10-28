// NOTE: It is totally possible to combine Mocha and Karma+Jasmine, especially if Mocha is used to test some node server-side or desktop node code (ie: code that affects the filesystem)

const sayModuleLocalDir = __dirname + "\\..\\lib\\Say";
console.log(sayModuleLocalDir);

var assert = require('assert');
var { Say } = require( '../lib/Say' );


// This spec will use async/await to:
// Ensure a series of await calls complete as expected.
// Ensure await (Promise) errors are handled.
// [TODO]



/**
 * Says "Hello"
 * @returns {*a Promise} Promise(resolve, reject)
 */
function sayHello() {
    return Say.speak('Hello, how are you today?');
};


// MOCHA SPEC BECAUSE TESTING NODE ON THE FILESYSTEM

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
describe('Say', function() {
    // This spec will use Promises to:
    // 1. Try to stop text-to-speech (tts) and fail
    // 2. Start tts
    // 3. Try to start another tts while tts is already running and fail
    // 4. Stop active tts midsentence
    describe('on stop talking when no active tts is running', function() {
        it('should reject with a custom Error', function() {
            Say.stop().catch((err) => {
                assert.equal(typeof err, 'Error');
            });
        });
    });
    describe('on saying "Hello, ..."', function() {
        it('should resolve when done or when it has been stopped', function() {
            sayHello().then(() => {
                assert.equal(1, 1);
            });
        });
    });
    describe('on saying "Hello, ..." again after 1 second', function() {
        it('should reject with a custom Error', function() {
            setTimeout(function() {
                sayHello().catch((err) => {
                    assert.equal(typeof err, 'Error');
                });
            }, 1000);
        });
    });
    describe('on stoppping the active tts after 2 seconds', function() {
        it('should resolve when stopped and the active "Hello, ..." tts should stop mid-sentence and immediately resolve itself', function() {
            setTimeout(function() {
                Say.stop().then(() => {
                    assert.equal(1, 1);
                });
            }, 2000);
        });
    });
    
});
