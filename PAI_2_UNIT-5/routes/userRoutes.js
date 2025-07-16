let express = require ('express');
const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
} = require ('../controllers/userController');
let userRouter = express.Router ();

// signup
userRouter.post ('/signup', signUp);
// login
userRouter.post ('/login', login);
// forgot password
userRouter.post ('/forgot-password', forgotPassword);
// reset password
userRouter.post ('/reset-password/:token', resetPassword);

module.exports = userRouter;
