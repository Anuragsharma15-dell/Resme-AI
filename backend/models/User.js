// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    githubId: String,
    name: String,
    email: String,
    avatar: String,
    provider: {
      type: String,
      enum: ["google", "github"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
