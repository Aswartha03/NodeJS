let dataCheckMiddleware = (req,res,next)=>{
    let {title,author} = req.body ;
    if(!title || !author ){
        return res.status(400).json({message:"Incomplete Data"})
    }
    next()
}

module.exports = dataCheckMiddleware