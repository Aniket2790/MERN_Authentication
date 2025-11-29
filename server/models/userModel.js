import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: {
    type: String,
    minLength: [8, "Password must be at least 8 characters long"],
    maxLength: [32, "Password cannot exceed 32 characters"],
    select: false,
  },

  phone: String,
  accountVerified: { type: Boolean, default: false },
  verificationCode: Number,
  verificationCodeExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateVerificationCode = function () {
  function generateRandomFiveDigitNumber() {
    const firstDigit = Math.floor(Math.random() * 9) + 1; // Ensure the first digit is not zero
    const remainingDigits = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0"); // Generate the remaining 4 digits

    return parseInt(firstDigit + remainingDigits);
  }
  const verificationCode = generateRandomFiveDigitNumber();
  this.verificationCode = verificationCode;
  this.verificationCodeExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now for expiretion of verification code

  return verificationCode;
};
userSchema.methods.generateToken = async function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes from now for expiration of reset password token
  return resetToken;
};

export const User = mongoose.model("User", userSchema);
