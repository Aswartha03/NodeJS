var jwt = require ('jsonwebtoken');

require ('dotenv').config ();


let authMiddleware = (roles) => {
  return async (req, res, next) => {
    try {
      let token = req.headers?.authorization?.split (' ')[1];
      var decoded = jwt.verify(token,process.env.JWT_SECURITY_KEY);
      if(!decoded){
        return res.status(400).json({message:"Invalid token"})
      }
      let role = decoded.role 
      // console.log(role)
      if(!roles.includes(role)){
        return res.status(402).json({message:"UnAuthorized"})
      }
      req.user = decoded.userId 
    // console.log("passed Through mw")
    next()
      
    } catch (error) {
      if (error.message == 'jwt expired') {
        return res
          .status (400)
          .json ({message: 'Token expired , please login again'});
      }
      res.status (500).json ({message: error.message});
    }
  };
};

module.exports = authMiddleware;
