import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { createToken } from "./../utils/authUtils/tokenValidation.js";

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
    balance: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["user", "admin", "seller"],
      default: "user",
    },
    photo_url: {
      type: String,
      default: "",
    },
    is_verified: {
      // Check verify email before checkout
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "deactive", "banned"],
      default: "active",
    },

    validation_token: {
      value: {
        type: String,

      },
      expired_at: {
        type: Date,

      },
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, // Automatically add created_at and updated_at
  }
);

//statics

//methods

userSchema.methods.createAndUpdateToken = async function () {
  const tokenObject = await createToken(this.email);
  const updatedUser = await this.findOneAndUpdate(
    { email },
    { $set: { validation_token: tokenObject } },
    { returnDocument: "after" }
  );
  return updatedUser;
};

userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
