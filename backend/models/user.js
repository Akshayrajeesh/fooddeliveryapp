const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { type } = require("os");
const { timeStamp } = require("console");

//create schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxlength: [30, "Name cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email id"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email id"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: 8,
      select: false, //when we are fetching user date password should not come back
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please enter your confirmed password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not same", // this message is sent if password enterd in the confirm password section is not same with the previously entered password
      },
    },
    phoneNumber: {
      type: Number,
      required: true,
      match: [/^[0-9]{10}$/, "Enter valid phone number"],
    },
    role: {
      type: String,
      enum: ["user", "admin"], //only user and admin roles are available
      default: "user",
    },
    avatar: {
      public_id: String,
      url: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timeStamp: true }, //when the collection is created or updated it the timestamp will get stored automatically
);

//hash password
//pre("save")=>runs before data is saved
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
}); //before saving user data in mongodb this function runs

//password compare at login time
userSchema.methods.correctPassword = async function (
  candidatePassword, //password entered during login
  userPassword, // hashed password stored in db
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//checks whether the users password was changed after getting JWT token
//if yes, the old token is invalid and the user must login again
userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

//custome method to generate jwt token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

module.exports = mongoose.model("User", userSchema); //User is the name of the table in the database
