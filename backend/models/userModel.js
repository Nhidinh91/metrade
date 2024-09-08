import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
      update_at: {
        type: Date,
        default: Date.now(), // must include this field, otherwise, when create new token, the token obj will not be added in db
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
userSchema.statics.verifyUser = async function (email) {
  const updatedUser = await this.findOneAndUpdate(
    { email },
    { $set: { isVerified: true } },
    { returnDocument: "after" }
  );
  return updatedUser;
};

userSchema.statics.saveTokenToUserWithEmail = async function (email, token) {
  const tokenObject = {
    value: token,
    update_at: Date.now(),
  };
  const updatedUser = await this.findOneAndUpdate(
    { email },
    { $set: { validation_token: tokenObject } },
    { returnDocument: "after" }
  );
  // return updatedUser;
  return;
};

userSchema.statics.findUserByEmail = async function (email) {
  const user = await this.findOne({ email });
  return user;
};
//method


userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
