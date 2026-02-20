import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateState } from "arctic";
import { Notion } from "arctic";
import jwt from "jsonwebtoken";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

const getNotionAuth = async (req, res) => {
  const notion = new Notion(
    process.env.NOTION_CLIENT_ID,
    process.env.NOTION_CLIENT_SECRET,
    `http://localhost:8000/notion/callback`,
  );

  try {
    const state = generateState();
    const url = notion.createAuthorizationURL(state);

    // Cookie config that works on localhost HTTP
    const cookieConfig = {
      httpOnly: true,
      secure: false,
      maxAge: 10 * 60 * 1000, // 10 minutes — short-lived for OAuth flow
      sameSite: "lax",
    };
    res.cookie("notion_oauth_state", state, cookieConfig);

    // Preserve user identity through the OAuth redirect chain.
    // Read the login token from: query param (frontend passes it) OR existing cookie.
    const linkingToken = req.query.token || req.cookies?.accessToken;
    if (linkingToken) {
      res.cookie("notion_linking_token", linkingToken, cookieConfig);
    }

    res.redirect(url.toString());
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, error.message));
  }
};

const getNotionCallback = async (req, res) => {
  const notion = new Notion(
    process.env.NOTION_CLIENT_ID,
    process.env.NOTION_CLIENT_SECRET,
    `http://localhost:8000/notion/callback`,
  );

  const { code, state } = req.query;
  const storedState = req.cookies.notion_oauth_state;

  const handleFailedLogin = (reason = "unknown") => {
    console.log("Notion OAuth failed:", reason);
    return res.redirect(`${FRONTEND_URL}/auth/oauth?notion=failed`);
  };

  // Validate state
  if (!state || state !== storedState) {
    return handleFailedLogin("state mismatch");
  }

  // Exchange code for tokens
  let tokens;
  try {
    tokens = await notion.validateAuthorizationCode(code);
  } catch (error) {
    console.log("Notion token exchange error:", error);
    return handleFailedLogin("token exchange failed");
  }

  const accessToken = tokens.accessToken();

  // Fetch Notion user/workspace info
  let notionUser;
  try {
    const response = await fetch("https://api.notion.com/v1/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Notion-Version": "2022-06-28",
      },
    });

    if (!response.ok) {
      return handleFailedLogin("failed to fetch notion user");
    }

    notionUser = await response.json();
  } catch (error) {
    console.log("Notion user fetch error:", error);
    return handleFailedLogin("notion api error");
  }

  // Link to logged-in user via the linking token cookie
  const linkingToken = req.cookies?.notion_linking_token;
  if (!linkingToken) {
    return handleFailedLogin("no linking token — user not logged in");
  }

  let userId;
  try {
    const decoded = jwt.verify(linkingToken, process.env.ACCESS_TOKEN_SECRET);
    userId = decoded._id;
  } catch (error) {
    console.log("JWT verification error:", error);
    return handleFailedLogin("invalid linking token");
  }

  // Update user with Notion data
  try {
    await User.findByIdAndUpdate(userId, {
      $set: {
        "platforms.notion.oauthConnected": true,
        "platforms.notion.accessToken": accessToken,
        "platforms.notion.workspaceId": notionUser.bot?.workspace_name || "",
        "platforms.notion.workspaceName": notionUser.bot?.workspace_name || "",
        "platforms.notion.workspaceIcon": notionUser.bot?.workspace_icon || "",
        "platforms.notion.botId":
          notionUser.bot?.owner?.user?.id || notionUser.id || "",
      },
    });
  } catch (error) {
    console.log("DB update error:", error);
    return handleFailedLogin("database update failed");
  }

  // Clear OAuth cookies
  res.clearCookie("notion_oauth_state");
  res.clearCookie("notion_linking_token");

  return res.redirect(`${FRONTEND_URL}/auth/oauth?notion=success`);
};

export { getNotionAuth, getNotionCallback };
