let express = require("express");

let app = express();

// test Route
app.get("/test", (req, res) => {
  console.log("Test Route is Running...");
  res.send("Test Route is Running.");
});
// event logger Route...

let { logEvent } = require("../timerModules/eventLogger");
app.get("/emit", (req, res) => {
  console.log("Event Logger Route is Working...");
  let data = logEvent("This is a Custom Message");
  res.send(data);
});

// delay Route...

let delayMessage = require("../timerModules/delay");

app.get("/delay", (req, res) => {
  console.log("Delay Route is Working...");
  delayMessage("Aswartha", 2000, (result) => {
    console.log("Data:", result);
    res.send(result);
  });
});

app.listen(3500, () => {
  console.log("Server Running on the 3500 port...");
});
