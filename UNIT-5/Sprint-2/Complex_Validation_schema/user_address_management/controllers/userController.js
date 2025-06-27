const userModel = require("../models/userModel");

let addNewUser = async (req, res) => {
  try {
    await userModel.create(req.body);
    res.status(200).json({ message: "user Created Successfully" });
  } catch (error) {
    console.log("Error in creation of new user :", error.message);
    res.status(500).json({ message: error.message });
  }
};

let addNewAddress = async (req, res) => {
  try {
    let id = req.params.userId;
    // console.log(id);
    let user = await userModel.findById({ _id: id });
    user.address.push(req.body);
    await user.save();
    res.status(200).json({ message: "Address is added.." });
  } catch (error) {
    console.log("error:", error.message);
    res.status(500).json({ Error: "Error while adding new address" });
  }
};

let getUsersSummary = async (req, res) => {
  try {
    let users = await userModel.find();
    let totalUsers = users.length;
    let totalAddressesInAllUsers = users.reduce((a, user) => {
      return a + (user.address ? user.address.length : o);
    }, 0);
    let userAddressSummary = users.map((user) => ({
      name: user.name,
      id : user._id,
      addressCount: user.address? user.address.length : 0
    }));
    res
      .status(200)
      .json({
        message: "Users Summary",
        totalUsers,
        totalAddressesInAllUsers,
        userAddressSummary,
      });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: "error during getting user summary" });
  }
};

let getUserDetailsById = async (req, res) => {
  try {
    let id = req.params.userId;
    let userDetails = await userModel.findById({ _id: id });
    // console.log(userDetails)
    res.status(200).json({ message: "User Details", user: userDetails });
  } catch (error) {
    console.log("Error:", error.message);
    res
      .status(500)
      .json({ message: "error during getting user details by id" });
  }
};

module.exports = {
  addNewUser,
  addNewAddress,
  getUsersSummary,
  getUserDetailsById,
};
