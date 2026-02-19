import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateState } from "arctic";
import { GitHub } from "arctic";
import jwt from "jsonwebtoken";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const GITHUB_REDIRECT_URI =
  process.env.GITHUB_REDIRECT_URI ||
  `http://localhost:${process.env.PORT || 8000}/github/callback`;

// ─────────────────────────────────────────────────────────
//  GET /github/oauth  →  Redirect to GitHub consent screen
// ─────────────────────────────────────────────────────────
const getGithubAuth = async (req, res) => {
  const github = new GitHub(
    process.env.GITHUB_CLIENT_ID,
    process.env.GITHUB_CLIENT_SECRET,
    GITHUB_REDIRECT_URI,
  );

  try {
    const state = generateState();
    const url = github.createAuthorizationURL(state, ["user:email"]);

    const cookieConfig = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 10 * 60 * 1000, // 10 min — short-lived for OAuth
      sameSite: "lax",
    };

    // Persist state for CSRF validation
    res.cookie("github_oauth_state", state, cookieConfig);

    // Preserve the logged-in user's JWT through the redirect chain
    const userToken = req.cookies?.accessToken;
    if (userToken) {
      res.cookie("github_linking_token", userToken, cookieConfig);
    }

    res.redirect(url.toString());
  } catch (error) {
    console.error("GitHub OAuth redirect error:", error);
    return res.status(500).json(new ApiError(500, error.message));
  }
};

// ─────────────────────────────────────────────────────────
//  GET /github/callback
//  • Validate state
//  • Exchange code → accessToken
//  • Identify user from JWT cookie
//  • Save accessToken + mark verified
//  • Return postMessage HTML to close popup
// ─────────────────────────────────────────────────────────
const getGithubCallback = async (req, res) => {
  // Helper: send error HTML that closes popup
  const sendError = (reason = "unknown") => {
    console.error("GitHub OAuth callback failed:", reason);
    return res.send(`
      <html><body>
      <script>
        try {
          console.log("GitHub verification FAILED, sending postMessage...");
          if (window.opener) {
            window.opener.postMessage(
              { type: "GITHUB_VERIFICATION_FAILED", success: false, error: "${reason.replace(/"/g, '\\"')}" },
              "*"
            );
          }
        } catch(e) { console.error("postMessage error:", e); }
        setTimeout(function() { window.close(); }, 500);
      </script>
      <p>Verification failed. This window will close automatically.</p>
      </body></html>
    `);
  };

  try {
    const { code, state } = req.query;
    const storedState = req.cookies?.github_oauth_state;

    // 1. Validate state (CSRF protection)
    if (!code || !state || !storedState || state !== storedState) {
      return sendError("State mismatch or missing authorization code");
    }

    // Clear state cookie immediately
    res.clearCookie("github_oauth_state");

    // 2. Exchange code for access token
    const github = new GitHub(
      process.env.GITHUB_CLIENT_ID,
      process.env.GITHUB_CLIENT_SECRET,
      GITHUB_REDIRECT_URI,
    );

    let tokens;
    try {
      tokens = await github.validateAuthorizationCode(code);
    } catch (error) {
      return sendError("Failed to exchange authorization code");
    }

    const accessToken = tokens.accessToken();

    // 3. Identify the logged-in user via JWT cookie
    const linkingToken =
      req.cookies?.github_linking_token || req.cookies?.accessToken;
    if (!linkingToken) {
      return sendError("No user session found — please log in first");
    }

    let userId;
    try {
      const decoded = jwt.verify(linkingToken, process.env.ACCESS_TOKEN_SECRET);
      userId = decoded._id;
    } catch (error) {
      return sendError("Invalid or expired session token");
    }

    // 4. Save ONLY the accessToken — do NOT fetch profile/repos
    await User.findByIdAndUpdate(userId, {
      $set: {
        "platforms.github.accessToken": accessToken,
        "platforms.github.oauthConnected": true,
        "platforms.github.connectedAt": new Date(),
      },
    });

    // Clear the linking cookie
    res.clearCookie("github_linking_token");

    console.log("GitHub verified for userId:", userId);

    // 5. Return HTML that posts success message and closes popup
    return res.send(`
      <html><body>
      <script>
        try {
          console.log("GitHub verified! Sending postMessage to opener...");
          if (window.opener) {
            window.opener.postMessage(
              { type: "GITHUB_VERIFIED", success: true },
              "*"
            );
            console.log("postMessage sent successfully");
          } else {
            console.error("No window.opener available");
          }
        } catch(e) { console.error("postMessage error:", e); }
        setTimeout(function() { window.close(); }, 500);
      </script>
      <p>GitHub verified! This window will close automatically.</p>
      </body></html>
    `);
  } catch (error) {
    console.error("GitHub OAuth callback unhandled error:", error);
    return sendError("Internal server error");
  }
};

// ─────────────────────────────────────────────────────────
//  GET /github/disconnect  →  Clear GitHub data
// ─────────────────────────────────────────────────────────
const disconnectGithub = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }
    await User.findByIdAndUpdate(req.user._id, {
      $set: {
        "platforms.github.url": "",
        "platforms.github.oauthConnected": false,
        "platforms.github.accessToken": "",
        "platforms.github.repos": [],
        "platforms.github.connectedAt": null,
      },
    });
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Github disconnected successfully"));
  } catch (err) {
    console.log(err);
    return res.status(500).json(new ApiError(500, err.message));
  }
};

// ─────────────────────────────────────────────────────────
//  GET /github/getAllMyRepos
// ─────────────────────────────────────────────────────────
const getAllMyRepos = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }
    const github = user.platforms?.github || null;
    if (!github || !github.url) {
      return res
        .status(404)
        .json(new ApiError(404, "Github profile not found"));
    }
    const githubUsername = github.url.split("github.com/")[1];
    const response = await fetch(
      `https://api.github.com/users/${githubUsername}/repos`,
    );
    const repos = await response.json();
    const formattedRepos = await Promise.all(
      repos.map(async (repo) => {
        let repo_languages = {};
        try {
          const langRes = await fetch(
            `https://api.github.com/repos/${githubUsername}/${repo.name}/languages`,
          );
          if (langRes.ok) {
            repo_languages = await langRes.json();
          }
        } catch (err) {
          console.error(`Failed to fetch languages for ${repo.name}`);
        }
        return {
          project_name: repo.name,
          description: repo.description || "",
          topics: repo.topics || [],
          primary_language: repo.language || null,
          repo_languages,
          created_at: repo.created_at,
          last_updated: repo.pushed_at,
          stars: repo.stargazers_count || 0,
          forks: repo.forks_count || 0,
          size: repo.size,
          default_branch: repo.default_branch,
        };
      }),
    );
    await User.findByIdAndUpdate(req.user._id, {
      $set: { "platforms.github.repos": formattedRepos },
    });
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          formattedRepos,
          "Github repositories fetched successfully",
        ),
      );
  } catch (err) {
    console.log(err);
    return res.status(500).json(new ApiError(500, err.message));
  }
};

// ─────────────────────────────────────────────────────────
//  GET /github/fetchRepos
// ─────────────────────────────────────────────────────────
const fetchRepos = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }
    const github = user.platforms?.github || null;
    if (!github || !github.accessToken) {
      return res.status(404).json(new ApiError(404, "Github not connected"));
    }
    const accessToken = github.accessToken;

    const reposResponse = await fetch(
      "https://api.github.com/user/repos?per_page=100&sort=updated",
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    if (!reposResponse.ok) {
      return res
        .status(400)
        .json(new ApiError(400, "Failed to fetch repos from GitHub"));
    }
    const repos = await reposResponse.json();
    const githubUsername = github.url?.split("github.com/")[1] || "";

    const formattedRepos = await Promise.all(
      repos.map(async (repo) => {
        let repo_languages = {};
        try {
          const langRes = await fetch(
            `https://api.github.com/repos/${githubUsername}/${repo.name}/languages`,
            { headers: { Authorization: `Bearer ${accessToken}` } },
          );
          if (langRes.ok) {
            repo_languages = await langRes.json();
          }
        } catch (err) {
          console.error(`Failed to fetch languages for ${repo.name}`);
        }
        return {
          project_name: repo.name,
          description: repo.description || "",
          topics: repo.topics || [],
          primary_language: repo.language || null,
          repo_languages,
          created_at: repo.created_at,
          last_updated: repo.pushed_at,
          stars: repo.stargazers_count || 0,
          forks: repo.forks_count || 0,
          size: repo.size,
          default_branch: repo.default_branch,
        };
      }),
    );

    await User.findByIdAndUpdate(req.user._id, {
      $set: { "platforms.github.repos": formattedRepos },
    });
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          formattedRepos,
          "Repos fetched and added successfully",
        ),
      );
  } catch (err) {
    console.log(err);
    return res.status(500).json(new ApiError(500, err.message));
  }
};

export {
  getAllMyRepos,
  getGithubAuth,
  getGithubCallback,
  disconnectGithub,
  fetchRepos,
};
