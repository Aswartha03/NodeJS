const { timeStamp } = require("console");
let events = require("events");

class Logger extends events {}

let logger = new Logger();

logger.on("log", (message, time) => {
  return {
    status: "Event Logged",
    timeStamp: time,
  };
});

function logEvent(message) {
  const time = new Date().toISOString();
  logger.emit('log', message, time);
  return { status: "Event Logged", timeStamp: time };
}

module.exports = {logger , logEvent}
