import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
<<<<<<< backend-features
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
};

const register = async (req, res, next) => {
    try {
        // Based on:
        // const profileData = {
        //     name: "Lakshya Dubey",
        //     email: "lakshya@example.com",
        //     institution: "JSS Academy of Technical Education",

        //     avatar: "/avatars/avatar-1.png",

        //     links: {
        //       github: "https://github.com/lakshya-byte",
        //       linkedin: "...",
        //       leetcode: "...",
        //       behance: "...",
        //     },

        //     stats: {
        //       level: 12,
        //       xp: 2450,
        //       rank: "Architect",
        //       streak: 18,
        //       skillScore: 87,
        //       badges: ["AI Engineer", "Frontend Master"],
        //     },

        //     skills: [
        //       { name: "Next.js", level: 90 },
        //       { name: "Three.js", level: 80 },
        //       { name: "AI/ML", level: 75 },
        //     ],

        //     projects: [
        //       {
        //         name: "SkillScape AI",
        //         description: "3D skill intelligence platform",
        //       },
        //     ],
        //   };
        const { name, email, password, institute, avatar, links } = req.body;
        if (!name || !email || !password) {
            return res
                .status(400)
                .json(new ApiError(400, "Enter mandatory Fields"));
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(409)
                .json(new ApiError(409, "Email already exists"));
        }

        const data = {
            email,
            name,
            password,
            institute,
            avatar,
            platforms: {
                github: {
                    url: links.github || ""
                },
                behance: links.behance || "",
                linkedin: links.linkedin || "",
                leetcode: links.leetcode || ""
            }
        }
        const newUser = await User.create(data);

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(newUser._id);

        const safeUser = await User.findById(newUser._id).select(
            "-password -refreshToken"
        );

        const options = {
            secure: false,
            httpOnly: true,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        };

        return res
            .status(201)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    201,
                    {
                        user: safeUser,
                        accessToken,
                        refreshToken
                    },
                    "User registered successfully"
                )
            );
    } catch (error) {
        console.log(error)
        return res.status(400).json(new ApiError(400, error.message))
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json(new ApiError(400, "All fields are required"));

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json(new ApiError(404, "User not found"));
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect)
            return res.status(401).json(new ApiError(401, "Invalid password"));

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
            user._id
        );

        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        const options = {
            secure: false,
            httpOnly: true,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        };
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200, {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                }, "User logged in successfully")
            );
    } catch (err) {
        console.log(err)
        return res
            .status(err.statusCode || 500)
            .json(new ApiError(err.statusCode || 500, err.message));
    }
}

const logout = (async (req, res) => {
    if (req.user?._id) {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: { refreshToken: 1 }
            },
            {
                new: true
            }
        );
=======
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const register = async (req, res, next) => {
  try {
    // Based on:
    // const profileData = {
    //     name: "Lakshya Dubey",
    //     email: "lakshya@example.com",
    //     institution: "JSS Academy of Technical Education",

    //     avatar: "/avatars/avatar-1.png",

    //     links: {
    //       github: "https://github.com/lakshya-byte",
    //       linkedin: "...",
    //       leetcode: "...",
    //       behance: "...",
    //     },

    //     stats: {
    //       level: 12,
    //       xp: 2450,
    //       rank: "Architect",
    //       streak: 18,
    //       skillScore: 87,
    //       badges: ["AI Engineer", "Frontend Master"],
    //     },

    //     skills: [
    //       { name: "Next.js", level: 90 },
    //       { name: "Three.js", level: 80 },
    //       { name: "AI/ML", level: 75 },
    //     ],

    //     projects: [
    //       {
    //         name: "SkillScape AI",
    //         description: "3D skill intelligence platform",
    //       },
    //     ],
    //   };
    const { name, email, password, institute, avatar, links } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json(new ApiError(400, "Enter mandatory Fields"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json(new ApiError(409, "Email already exists"));
>>>>>>> main
    }

    const data = {
      email,
      name,
      password,
      institute,
      avatar,
      platforms: {
        github: {
          url: links.github || "",
        },
        behance: links.behance || "",
        linkedin: links.linkedin || "",
        leetcode: links.leetcode || "",
      },
    };
    const newUser = await User.create(data);

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      newUser._id,
    );

    const safeUser = await User.findById(newUser._id).select(
      "-password -refreshToken",
    );

    const options = {
<<<<<<< backend-features
        httpOnly: true,
        secure: false,
        sameSite: "lax"
=======
      secure: true,
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
>>>>>>> main
    };

    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          201,
          {
            user: safeUser,
            accessToken,
            refreshToken,
          },
          "User registered successfully",
        ),
      );
  } catch (error) {
    console.log(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json(new ApiError(400, "All fields are required"));

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect)
      return res.status(401).json(new ApiError(401, "Invalid password"));

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id,
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken",
    );

    const options = {
      secure: true,
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
            refreshToken,
          },
          "User logged in successfully",
        ),
      );
  } catch (err) {
    console.log(err);
    return res
      .status(err.statusCode || 500)
      .json(new ApiError(err.statusCode || 500, err.message));
  }
};

const logout = async (req, res) => {
  if (req.user?._id) {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: { refreshToken: 1 },
      },
      {
        new: true,
      },
    );
  }

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
};

export { register, login, logout };
