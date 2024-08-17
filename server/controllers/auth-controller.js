// Importing models
const User = require('../models/user-model')
const bcrypt = require('bcryptjs');
// Home Logic
const home = async (req, res) => {
    try {
        res.status(200).send("Welcome to MERN using controller home")
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: "Error in your code" })
    }
};
// Register Logic
const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({ msg: "User Already Exists" })
        }
        //Hashing the password - Has been moved to the user-model.js file

        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password,saltRound);
        const userCreated = await User.create({ username, email, phone, password });
        return res.status(200).json({ messgae: "User created successfully ", data: userCreated })



    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: "Error in code" })

  }
};

module.exports = { home, register };
