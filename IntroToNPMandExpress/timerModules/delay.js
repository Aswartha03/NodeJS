let timers = require("timers");

function delayMessage(message, delay, callback) {
  setTimeout(() => {
    callback({
      message: message,
      delay: `${delay} ms`,
    });
  }, delay);
}

module.exports = delayMessage;
