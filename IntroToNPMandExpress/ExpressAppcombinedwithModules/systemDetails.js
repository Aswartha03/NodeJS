let os = require("os");

let platform = os.platform();
// console.log(platform);
let totalMemory = `${(os.totalmem() / 1e9).toFixed(2)} GB`;
let freeMemory = `${(os.freemem() / 1e9).toFixed(2)} GB`;
let cpus = os.cpus();
let model = cpus[0].model.trim();

let details = {
  platform: platform,
  totalMemory: totalMemory,
  freeMemory: freeMemory,
  cpuModel: model,
};

module.exports = { details };
// console.log(details);
