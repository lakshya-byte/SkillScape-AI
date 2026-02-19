import {User} from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { decodeIdToken,generateCodeVerifier,generateState } from "arctic";

const getNotionAuth = async(req,res) => {   
    
}