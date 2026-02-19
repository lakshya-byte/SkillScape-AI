import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
<<<<<<< backend-features
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        avatar: String,
        role: {
            type: String,
            enum: ["Student", "Pass-out", "Others"],
            default: "Student"
        },
        institute: String,
        platforms: {
            github: {
                url: String,
                oauthConnected: { type: Boolean, default: false },
                accessToken: String,
                repos: Array,
                connectedAt: Date
            },
            notion: {
                oauthConnected: { type: Boolean, default: false },
                accessToken: String,
                notionId: String,
                workspaceId: String,
                workspaceName: String,
                workspaceIcon: String,
                botId: String,
                connectedAt: Date
            },
            linkedin: String,
            behance: String,
            leetcode: String
        },
        refreshToken: String,
        lastSync: {
            type: Date
        },
        skills: {
            nodes: [
                {
                    id: String,
                    type: {
                        type: String,
                        enum: ["USER", "SKILL", "PROJECT", "DOMAIN"]
                    },
                    displayName: String,
                    description: String,
                    metrics: {
                        level: { type: Number, default: 0 },
                        confidenceScore: { type: Number, default: 0 },
                        githubCommits: { type: Number, default: 0 },
                        experienceYears: { type: Number, default: 0 }
                    },
                    visuals: {
                        category: String,
                        colorHex: String,
                        iconType: String
                    },
                    interaction: {
                        route: String,
                        hasExpandableChildren: { type: Boolean, default: false },
                        childrenCursor: String
                    }
                }
            ],
            links: [
                {
                    id: String,
                    source: String,
                    target: String,
                    relationshipType: {
                        type: String,
                        enum: ["MASTERY", "AUTHORSHIP", "USES", "BELONGS_TO"]
                    },
                    strengthValue: { type: Number, default: 0 },
                    confidenceScore: { type: Number, default: 0 }
                }
            ],
            metadata: {
                totalNodes: { type: Number, default: 0 },
                totalLinks: { type: Number, default: 0 },
                generationTimestamp: Date,
                isPartialGraph: { type: Boolean, default: true },
                nextPageCursor: String
            },
            visualConfig: {
                nodeSizeScaleFactor: { type: Number, default: 2.5 },
                baseGlowIntensity: { type: Number, default: 1.5 },
                highlightGlowIntensity: { type: Number, default: 3.0 },
                linkThicknessScale: { type: Number, default: 1.2 },
                particleSpeedScale: { type: Number, default: 0.005 },
                dimmingOpacity: { type: Number, default: 0.15 }
            },
            interactionConfig: {
                expandableTypes: { type: [String], default: ["USER", "DOMAIN", "PROJECT"] },
                focusDistanceMultiplier: { type: Number, default: 1.8 },
                enableClickNavigation: { type: Boolean, default: true },
                enableHoverIntelligence: { type: Boolean, default: true }
            },
            futurePotential: [
                {
                    id: String,
                    type: {
                        type: String,
                        enum: ["SKILL", "PROJECT", "DOMAIN"]
                    },
                    displayName: String,
                    description: String,
                    reason: String,
                    relevanceScore: { type: Number, default: 0 },
                    difficulty: {
                        type: String,
                        enum: ["beginner", "intermediate", "advanced"]
                    },
                    basedOn: [String],
                    estimatedTimeWeeks: { type: Number, default: 0 },
                    resources: [
                        {
                            title: String,
                            url: String,
                            type: {
                                type: String,
                                enum: ["course", "article", "video", "repo", "docs"]
                            }
                        }
                    ],
                    visuals: {
                        category: String,
                        colorHex: String,
                        iconType: String
                    }
                }
            ]
        }

=======
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
>>>>>>> main
    },
    institute: String,
    platforms: {
      github: {
        url: String,
        oauthConnected: { type: Boolean, default: false },
        accessToken: String,
        repos: Array,
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
    resetPasswordOTP: String,
    resetPasswordOTPExpires: Date,
    lastSync: {
      type: Date,
    },
  },
  { timestamps: true },
);

// Hash on create/save
userSchema.pre("save", async function () {
<<<<<<< backend-features
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
=======
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
>>>>>>> main
});

// Hash on findOneAndUpdate if password is changed
userSchema.pre("findOneAndUpdate", async function () {
    const update = this.getUpdate();

    if (!update) return;

    // check direct password update
    if (update.password) {
        update.password = await bcrypt.hash(update.password, 10);
    }

    // check $set.password update
    if (update.$set && update.$set.password) {
        update.$set.password = await bcrypt.hash(update.$set.password, 10);
    }

    this.setUpdate(update);
});


userSchema.methods.isPasswordCorrect = async function (password) {
<<<<<<< backend-features
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
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15d" }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "30d",
    });
=======
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
>>>>>>> main
};

export const User = mongoose.model("User", userSchema);
