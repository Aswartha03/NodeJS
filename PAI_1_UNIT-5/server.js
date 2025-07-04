let express = require("express")
const connectToDb = require("./configs/db")
const bookRouter = require("./routes/bookRoutes")
const authorRouter = require("./routes/authorRouter")
let app  = express()
app.use(express.json())
connectToDb()

// test route 
app.get("/test",(req,res)=>{
    res.status(200).json({message:"Test Route is Working"})
})

// book routes 
app.use("/books",bookRouter)
// author routes 
app.use("/author",authorRouter)

// any unhandled Route 
app.get("*",(req,res)=>{
    res.status(404).json({message:"404, Route is not found.."})
})

app.listen(3000,()=>{
    console.log("Server is Running on the port 3000...")
})