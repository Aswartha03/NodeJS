let boxen = require("boxen");

let title = "Hurray!!!";
let message = `${title}\nI am using my first external module!`;

let defaultClassic = boxen(message, {
  borderStyle: "classic",
  padding: 1,
  align: "center",
});

let singleDoubleBox = boxen(message, {
  borderStyle: "singleDouble",
  align: "center",
  padding: 1,
});

let roundedBox = boxen(message, {
  borderStyle: "round",
  align: "center",
  padding: 1,
});
console.log(defaultClassic);
console.log(singleDoubleBox);
console.log(roundedBox)
