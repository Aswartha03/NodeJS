let express = require("express");
const {
  addNewAddress,
  addNewUser,
  getUserDetailsById,
  getUsersSummary,
} = require("../controllers/userController");
let userRouter = express.Router();

// add new user
userRouter.post("/users", addNewUser);
// add new address
userRouter.post("/users/:userId/address", addNewAddress);
// get users summary
userRouter.get("/users/summary", getUsersSummary);
// get user details by id
userRouter.get("/user/:userId", getUserDetailsById);

module.exports = userRouter;
