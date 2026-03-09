
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRY,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRY,
} from "../constants.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "teacher", "student"],
      default: "student",
    },

    domain: {
      type: String,
      required: true,
    },

    bootcampId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bootcamp",
    },
    refreshToken: {
      type: String,
    },
    firstLogin: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// ================= PASSWORD HASH =================

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// ================= PASSWORD COMPARE =================

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ================= ACCESS TOKEN =================

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    JWT_ACCESS_SECRET,
    {
      expiresIn: JWT_ACCESS_EXPIRY,
    },
  );
};

// ================= REFRESH TOKEN =================

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    JWT_REFRESH_SECRET,
    {
      expiresIn: JWT_REFRESH_EXPIRY,
    },
  );
};

// ================= INDEXES =================

userSchema.index({ role: 1, domain: 1 });
userSchema.index({ bootcampId: 1, role: 1 });

const User = mongoose.model("User", userSchema);

export default User;