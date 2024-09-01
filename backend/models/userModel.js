import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
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
    photoURL: {
      type: String,
      default: "",
    },
    isVerified: {
      // Check verify email
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "deactive", "banned"],
      default: "user",
    },
    validationToken: {
      type: String,
      default: "",
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

const User = mongoose.model("User", userSchema);

export default User;
