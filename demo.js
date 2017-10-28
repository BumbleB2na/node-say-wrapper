var { Say } = require('./lib/Say');

(function main() {
    sayStuff();
})();

/**
 * Say a series of things using text-to-speech
 */
async function sayStuff() {
    tryToInterruptSoon();
    await Say.speak('I can be called through async/await.');
    stopTalkingSoon();
    await Say.speak('My voice can also be stopped in mid-sentence. For example, you won\'t get to hear me say doo doo daa daa.');
    await Say.speak('I have nothing more to say. Bye bye.');
};

/**
 * Stop any active text-to-speech after waiting a few seconds
 */
function stopTalkingSoon() {
    setTimeout(() => {
        Say.stop();
    }, 6560);
};

/**
 * Try to interrupt an active text-to-speech with a new one after waiting half a second
 */
function tryToInterruptSoon() {
    setTimeout(() => {
        Say.speak('This won\'t be read aloud because a text-to-speech instance is already talking. A custom error will be logged in a Promise reject').catch((error) => { console.error(error.message); });  //err => console.error(err));
    }, 500);
};
