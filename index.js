var { Say } = require('./lib/Say');

async function sayMoreStuff() {
    try {
        setTimeout(tryToInterrupt, 500);
        await Say.speak('I can be called through async/await');
        await Say.speak('My voice can also be stopped mid-sentence.');
        setTimeout(stopTalking, 3500);
        await Say.speak('For example, you won\'t hear the rest of this sentence because we stopped text-to-speech after an interval');
    } catch(err) {
        console.error(err);
        return;
    }
};
function stopTalking() {
    Say.stop();
};
function tryToInterrupt() {
    Say.speak('This won\'t be read aloud because a text-to-speech instance is already talking. A custom error will be logged in a Promise reject');
};

sayStuff();