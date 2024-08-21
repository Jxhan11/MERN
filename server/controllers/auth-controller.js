// Importing models
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
// Home Logic
const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to MERN using controller home");
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error in your code" });
  }
};
// Register Logic
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ msg: "User Already Exists" });
    }

    //Hashing the password - Has been moved to the user-model.js file
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password,saltRound);

    const userCreated = await User.create({ username, email, phone, password });
    return res
      .status(200)
      .json({
        message: "User created successfully ",
        data: userCreated,
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error in code" });
  }
};

//Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res
        .status(400)
        .json("Invalid Credentials or Please Register for an account first");
    }
    const user = await userExist.comparePasswords(password);
    if (user) {
      return res.status(200).json({
        msg: "logged in successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      return res.status(401).json("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
    console.error(error);
  }
};

module.exports = { home, register, login };
