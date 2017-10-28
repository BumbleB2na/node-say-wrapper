/**
 * Mocha spec to unit test text-to-speech (tts) functionality on desktop
 *
 * This spec will use Promises to:
 *  1. Try to stop tts and fail
 *  2. Start tts
 *  3. Try to start another tts while tts is already running and fail
 *  4. Stop active tts midsentence
 */
var { Say } = require( '../lib/Say' );

var assert = require('assert');

describe('Say', function() {
    describe('on stop when no active tts is running', function() {
        it('should reject with a custom Error', async () => {
            try {
                await Say.stop();
            } catch(error) {
                assert.equal(error instanceof Error, true);
                assert.equal(typeof error.message, 'string');
                console.error('\tSay.js Error: ' + error.message);
            }
        });
    });
    describe('on speak and stopping the active tts after a few seconds', function() {
        it('should resolve when stopped because, the active tts should stop mid-sentence and immediately resolve itself', async () => {
            setTimeout(() => {
                // stop speaking mid-sentence a few seconds later 
                Say.stop();
            }, 3300);
            await Say.speak('Testing, testing. Stop. This sentence will be stopped before it can complete.');
        });
    });
    describe('on speak then speaking again after 1 second', function() {
        it('should reject the second attempt with a custom Error', async () => {
            setTimeout(() => {
                // try to speak 1 second later while already speaking
                Say.speak('Won\'t be able to interrupt.').catch(error => {
                    assert.equal(error instanceof Error, true);
                    assert.equal(typeof error.message, 'string');
                    console.error('\tSay.js Error: ' + error.message);
                });
            }, 500);
            await Say.speak('Done testing.');
        });
    });
});
