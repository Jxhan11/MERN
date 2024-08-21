const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
//Pre methods
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

//function to generate JWT token
//This is an instance function

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        admin: this.isAdmin,
      },
      process.env.JWT_SIGN,
      {
        expiresIn: "30d",
      },
    );
  } catch (error) {
    console.error(error);
  }
};

//creating a compare password method to check if passwords match
userSchema.methods.comparePasswords = async function (password) {
  return bcrypt.compare(password, this.password);
};

// define User model
const User = new mongoose.model("User", userSchema);

module.exports = User;
