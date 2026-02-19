import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: String,
    role: {
      type: String,
      enum: ["Student", "Pass-out", "Others"],
      default: "Student",
    },
    institute: String,
    platforms: {
      github: {
        url: String,
        oauthConnected: { type: Boolean, default: false },
        accessToken: String,
      },
      notion: {
        oauthConnected: { type: Boolean, default: false },
        accessToken: String,
      },
      linkedin: String,
      behance: String,
      leetcode: String,
    },
    refreshToken: String,
    lastSync: {
      type: Date,
    },
  },
  { timestamps: true },
);

// Hash on create/save
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Hash on findOneAndUpdate if password is changed
userSchema.pre("findOneAndUpdate", async function () {
  const update = this.getUpdate();
  if (update?.password) {
    update.password = await bcrypt.hash(update.password, 10);
    this.setUpdate(update);
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15d" },
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "30d",
  });
};

export const User = mongoose.model("User", userSchema);
