let express = require("express");

let app = express();

// home Route
app.get("/home", (req, res) => {
  console.log("Home Page Opened");
  res.send("This is home page.");
});

//  contactus Route

app.get("/contactus", (req, res) => {
  console.log("contact us page opened");
  res.send("Contact us at contact@contact.com");
});

// about page 
app.get("/about",(req,res)=>{
    console.log("About page is opened")
    res.send("This is About page")
})
app.listen(3000, () => {
  console.log("Server run on the 3000 port...");
});
