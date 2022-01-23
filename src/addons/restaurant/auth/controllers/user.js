const bcrypt = require("bcrypt");
const User = require("../models/users");
const { groupByMarchant } = require("../utils");

// add user
const addUser = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;
     
    const isUnique = await User.findOne({ email: email }).exec();
    if (!isUnique) {
      const user = new User({
        first_name,
        last_name,
        email,
        password,
        marchant
      });
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(user.password, salt);
      user.password = hashPassword;
      const newUser = await user.save();
      res.send({
        status: true,
        message: "User added successfully",
        user: newUser,
      });
    } else {
      res.send({
        status: false,
        message: "The email is already taken",
      });
    }
  } catch (error) {
    next(error);
  }
};

const userByMarchant = async (req, res, next) => {
  try {
    const user = await groupByMarchant();
    res.send({
      status: true,
      message: "All user fetched successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

// get users
const getUsers = async (req, res, next) => {
  try {
    const user = await User.find().populate("marchant", "first_name last_name email company logo _id");
    res.send({
      status: true,
      message: "All users fetched successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addUser,
  getUsers,
  userByMarchant
};
