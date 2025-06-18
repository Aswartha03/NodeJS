let os = require("os");

// console.log(os.arch())
// console.log(os.type())
// // console.log(os.method())
// console.log(os.freemem())
function getSystemInfo() {
  console.log("Architecture:", os.arch());
  let cores = os.cpus();
  console.log("CPU Cores:", cores.length);
  console.log("Total memory:", os.totalmem(), "KB");
  console.log("Free Memory:", os.freemem(), "KB");
  console.log("Host name : ", os.hostname());
  console.log("OS type : ", os.type());
}

module.exports = { getSystemInfo };
