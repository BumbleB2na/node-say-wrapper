
// source: https://github.com/marak/say.js/ | tutorial: https://ourcodeworld.com/articles/read/305/how-to-convert-synthesize-text-to-speech-in-node-js
var say = require('say');

let _isTalking = false;


// This test will:
// 1. Try to stop tts and fail
// 2. Start tts
// 3. Try to start another tts while tts is already running and fail
// 4. Stop active tts midsentence

// Try to stop talking when no active tts is running. It should reject with a custom Error.
setTimeout(function() {
    sayStop().then(() => {
        console.log('Stopped active text to speech.');
    }).catch((err) => {
        console.error(err);
    });
}, 2000);

// Say "Hello, ...". It should resolve when done or when it has been stopped.
sayHello().then(() => {
    console.log('Done talking.');
}).catch((err) => {
    console.error(err);
});

// After 1 second try to say "Hello, ..." again. It should reject with a custom Error.
setTimeout(function() {
    sayHello().then(() => {
        console.log('Done talking.');
    }).catch((err) => {
        console.error(err);
    });
}, 1000);

// After 2 seconds stop the active tts. It should resolve when stopped and the active "Hello, ..." tts should stop mid-sentence and immediately resolve itself.
setTimeout(function() {
    sayStop().then(() => {
        console.log('Stopped active text to speech.');
    }).catch((err) => {
        console.error(err);
    });
}, 2000);


/**
 * Says "Hello"
 * @returns {*a Promise} Promise(resolve, reject)
 */
function sayHello() {
    return saySpeak('Hello, how are you today?');
};

/**
 * Wrap say.speak callback in a Promise.
 * Rejects with our own custom Error if there is already an active text-to-speech voice running. Normally text-to-speech can have overlapping voices but we are preventing that by using a Singleton pattern.
 * @param {*string of text to be read aloud} message 
 * @returns {*promise that resolves or rejects with an error message} Promise(resolve, reject)
 */
async function saySpeak(message) {
    return new Promise((resolve, reject) => {
        if(_isTalking) {
            reject(Error('MWS: Text-to-speech is already actively talking'));
            return;
        }
        _isTalking = true;
        say.speak(message, null, null, (err) => {
            _isTalking = false;
            if(err)
                reject(err);
            else
                resolve();
        });
    })
}

/**
 * Wrap say.stop callback in a Promise. 
 * Rejects with our own custom Error if there is no active text-to-speech to stop (also falls back to rejecting with the library's own Error if there is no voice to stop).
 */
async function sayStop() {
    return new Promise((resolve, reject) => {
        if(!_isTalking) {
            reject(Error('MWS: Text-to-speech is not actively talking'));
            return;
        }
        say.stop((err) => {
            if(err)
                reject(err);
            else
                resolve();
        });
    })
}
