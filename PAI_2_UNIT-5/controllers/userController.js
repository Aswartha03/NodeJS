const UserModel = require ('../models/userModel');
// brcypt data
const bcrypt = require ('bcrypt');
const saltRounds = 10;

// jwt data
var jwt = require ('jsonwebtoken');

require ('dotenv').config ();

let signUp = async (req, res) => {
  try {
    let {email, role, password} = req.body;
    let user = await UserModel.findOne ({email});
    if (user) {
      return res
        .status (200)
        .json ({message: 'User already signup , please login'});
    }
    bcrypt.hash (password, saltRounds, async function (err, hash) {
      if (hash) {
        let newUser = await UserModel.create ({email, role, password: hash});
        return res
          .status (201)
          .json ({message: 'User signup success', newUser});
      }
      res.status (400).json ({message: err.message});
    });
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

let login = async (req, res) => {
  try {
    let {email, password} = req.body;
    if (!email || !password) {
      return res
        .status (402)
        .json ({message: 'Please provide all fields for login'});
    }
    let user = await UserModel.findOne ({email});
    if (!user) {
      return res.status (401).json ({message: 'Unauthorised , please login'});
    }
    let hash = user.password;
    bcrypt.compare (password, hash, function (err, result) {
      if (result) {
        var token = jwt.sign (
          {userId: user._id, role: user.role},
          process.env.JWT_SECURITY_KEY,
          {expiresIn: 300}
        );
        return res.status (200).json ({message: 'login success', token});
      }
      return res.status (400).json ({message: 'password Wrong'});
    });
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

let forgotPassword = async (req, res) => {
  try {
    let {email} = req.body;
    if (!email) {
      return res.status (403).json ({message: 'Email Needed'});
    }
    let user = await UserModel.findOne ({email});
    if (!user) {
      return res.status (402).json ({message: 'User Not Found'});
    }
    var resetToken = jwt.sign (
      {userId: user._id},
      process.env.JWT_SECURITY_KEY
    );
    let resetLink = `http://localhost:3000/api/v1/auth/reset-password/${resetToken}`;
    res
      .status (200)
      .json ({message: 'Reset password link is generated', resetLink});
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

let resetPassword = async (req, res) => {
  try {
    let token = req.params.token;
    let {newPassword} = req.body;
    if (!token || !newPassword) {
      return res
        .status (403)
        .json ({message: 'Please provide token and new password'});
    }
    var decoded = jwt.verify (token, process.env.JWT_SECURITY_KEY);
    if (!decoded) {
      return res.stauts (400).json ({message: 'Invalid token'});
    }
    let userId = decoded.userId;
    let user = await UserModel.findById (userId);
    bcrypt.hash (newPassword, saltRounds, async function (err, hash) {
      if (hash) {
        user.password = hash;
        await user.save ();
        return res.status (201).json ({message: 'password updated'});
      }
      res.status (400).json ({message: err.message});
    });
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
};

module.exports = {signUp, login, forgotPassword, resetPassword};
