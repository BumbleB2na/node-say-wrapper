# node-say-wrapper
This wraps [node-say](https://github.com/marak/say.js/) module, which already offers simple, straightforward text-to-speech (tts) for desktop using native tts available on Windows, Mac OSX or Linux.  
  
## async/await
Make calls to access two of the original say.js methods (speak and stop) by using async/await instead of callbacks. This node-say-wrapper project wraps the original node-say, say.js module in an ES6 static class: Say.js. The original say.js "speak" and "stop" methods are available across all platforms. This project aims to be fully cross-[desktop]-platform so it only wraps those two methods.
  
## Using the ES6 Say.js wrapper
```
var { Say } = require('./lib/Say');

async function sayStuff() {
    try {
        await Say.speak('Hello world!');
        await stopTalking();
        await Say.speak('Bye bye.');
    } catch(err) {
        console.error(err); return;  // Error object bubbled up from Promise.reject
    }
}
sayStuff();

async function stopTalking() {
    try {
        setTimeout(() => { Say.stop(); }, 1100);
        await Say.speak('Stop talking.');  // Will say, "Stop talk--" and talking will be stopped mid-sentence
    } catch(err) {
        console.error(err); return;
    }
}
```
  
## Other features included in Say.js wrapper
- Singleton pattern introduced to prevent multiple overlapping tts instances. 
- Custom error messages thrown from Promise.reject if you attempt to:
    - Say.stop() but there is no active tts instance or,
    - Say.speak('...'); while an active tts instance is already speaking.
- Mocha unit tests to ensure node-say-wrapper still does as advertised.
  