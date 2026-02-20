import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      console.log("Unauthorized: No token provided");
      return res
        .status(401)
        .json(new ApiError(401, "Unauthorized: No token provided"));
    }

    const decoderToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoderToken?._id).select(
      "-password -refreshToken",
    );

    if (!user) {
      console.log("Unauthorized: No token provided");
      return res
        .status(401)
        .json(new ApiError(401, "Unauthorized: No token provided"));
    }
    console.log("Authorized: User found", user);
    req.user = user;
    next();
  } catch (error) {
    console.log("Unauthorized: Invalid token");
    return res
      .status(401)
      .json(new ApiError(401, error?.message || "Invalid Access Token"));
  }
};

export { verifyJWT };
