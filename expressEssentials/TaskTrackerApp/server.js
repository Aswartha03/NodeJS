const express = require("express")
const { tasksRouter } = require("./routes/tasksRouter")
let app = express()
app.use(express.json())
// console.log("Aswartha")
// test route 
app.get("/test",(req,res)=>{
    res.status(200).json({message:"Test Route is working"})
})

// tasks Router 
app.use("/tasks",tasksRouter)
/// any undefined route 
app.get("*",(req,res)=>{
    res.status(404).json({message:"404 , route is not found.."})
})

// port 
app.listen(3000,()=>{
    console.log("Server is Running on the 3000 port..")
})