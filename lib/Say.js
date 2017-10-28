var say = require('say');  // source: https://github.com/marak/say.js/ | tutorial: https://ourcodeworld.com/articles/read/305/how-to-convert-synthesize-text-to-speech-in-node-js
/**
 * Wraps node.js say library calls in a wrapper to support async/await.
 * Prevents overlapping text-to-speech and throws custom Errors using Promise reject.
 */
class Say {
    
    // This "static member" gets defined after class declaration, before export
    // static let _isTalking = false;

    /**
     * Wrap say.speak callback in a Promise.
     * Rejects with our own custom Error if there is already an active text-to-speech voice running. Normally text-to-speech can have overlapping voices but we are preventing that by using a Singleton pattern.
     * E.g. of using in a custom async function: await 
     * @param {*string of text to be read aloud} message 
     * @returns {*promise that resolves or rejects with an error message} Promise(resolve, reject)
     */
    static async speak(message) {
        return new Promise((resolve, reject) => {
            if(Say._isTalking) {
                reject(new Error('Text-to-speech is already actively talking'));
                return;
            }
            Say._isTalking = true;
            say.speak(message, null, null, (err) => {
                Say._isTalking = false;
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
    static async stop() {
        return new Promise((resolve, reject) => {
            if(!Say._isTalking) {
                reject(new Error('Text-to-speech is not actively talking'));
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
}
Say.prototype._isTalking = false;  // defines a "static member" on the class because ES6 does not support this.
exports.Say = Say;