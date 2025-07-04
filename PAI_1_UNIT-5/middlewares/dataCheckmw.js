let booksdataCheckMw = async(req,res,next)=>{
    try {
        let {title,year,genre} = req.body 
        if(!title ||  !year || !genre ){
            return res.status(203).json({message:"Provide all required fields"})
        }
        next()
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = booksdataCheckMw