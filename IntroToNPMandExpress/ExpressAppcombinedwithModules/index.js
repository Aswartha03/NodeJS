let express = require("express");

let app = express();

// test Route
app.get("/test", (req, res) => {
  console.log("Test route is working..");
  res.send("Test route is working!");
});

// read file route
let data = require("../ExpressAppcombinedwithModules/read");

app.get("/readfile", (req, res) => {
  console.log(data);
  res.send(data.data);
});

// system Details route
let details = require("../ExpressAppcombinedwithModules/systemDetails");
app.get("/systemdetails", (req, res) => {
  console.log("System Details Route is Worknig");
  res.send(details.details);
});
// get ip route
let dns = require("dns");
app.get("/getip", (req, res) => {
  console.log("GetIp Route is working..");
  const hostname = "masaischool.com";
  dns.lookup(hostname, (err, address, family) => {
    if (err) {
      console.log("DNS Lookup Error:", err);
      return res.status(500).send("Error fetching IP address");
    }
    res.send({
      hostname: hostname,
      ip: address,
      family: family === 4 ? "IPv4" : "IPv6",
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on 3000 port..");
});
