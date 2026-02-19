// import { github } from "../lib/oauth/github.js";
// import { github } from "../lib/oauth/github.js";
import { access } from "fs";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { decodeIdToken, generateCodeVerifier, generateState } from "arctic";
import { GitHub } from "arctic"

const getAllMyRepos = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json(new ApiError(404, "User not found"));
        }
        const github = user.platforms['github'] || null;
        if (!github) {
            return res.status(404).json(new ApiError(404, "Github profile not found"));
        }
        const githubLink = github.url
        if (!githubLink) {
            return res.status(404).json(new ApiError(404, "Github profile not found"));
        }
        const githubUsername = githubLink.split("github.com/")[1];
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
        const repos = await response.json();
        const formattedRepos = await Promise.all(
            repos.map(async (repo) => {
                let repo_languages = {};

                try {
                    const res = await fetch(
                        `https://api.github.com/repos/${githubUsername}/${repo.name}/languages`
                    );

                    if (res.ok) {
                        repo_languages = await res.json();
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
                    default_branch: repo.default_branch
                };
            })
        );
        await User.findByIdAndUpdate(req.user._id, {
            platforms: {
                ...user.platforms,
                github: {
                    ...github,
                    repos: formattedRepos
                }
            }
        })
        return res.status(200).json(new ApiResponse(200, formattedRepos, "Github repositories fetched successfully"));
    } catch (err) {
        console.log(err);
        return res.status(500).json(new ApiError(500, err.message))
    }
}

const getGithubAuth = async (req, res) => {
    const github = new GitHub(
        process.env.GITHUB_CLIENT_ID,
        process.env.GITHUB_CLIENT_SECRET,
        `http://localhost:8000/github/callback`
    )

    try {
        const state = generateState();
        const url = github.createAuthorizationURL(state, ["user:email"])

        const cookieConfig = {
            httpOnly: true,
            secure: true,
            maxAge: 5 * 24 * 60 * 60 * 1000,
            sameSite: "lax"
        }
        res.cookie("github_oauth_state", state, cookieConfig)

        res.redirect(url.toString())
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiError(500, error.message))
    }
}

const getGithubCallback = async (req, res) => {
    const github = new GitHub(
        process.env.GITHUB_CLIENT_ID,
        process.env.GITHUB_CLIENT_SECRET,
        `http://localhost:8000/github/callback`
    )
    const { code, state } = req.query;
    const storedState = req.cookies.github_oauth_state;
    const handleFailedLogin = () => {
        req.flash(
            "errors",
            "Couldn't authenticate with GitHub. Please try again."
        )
        return res.redirect("/auth/oauth");
    }
    if (!state || state !== storedState) {
        return handleFailedLogin();
    }

    let tokens;
    try {
        tokens = await github.validateAuthorizationCode(code);
    } catch (error) {
        return handleFailedLogin();
    }
    const githubUserResponse = await fetch("https://api.github.com/user",{
        headers:{
            Authorization: `Bearer ${tokens.accessToken()}`
        }
    })
    if(!githubUserResponse.ok) return handleFailedLogin();
    const githubUser = await githubUserResponse.json();
    console.log(githubUser);
    const response = await fetch("https://api.github.com/user/emails", {
        headers: {
            Authorization: `Bearer ${tokens.accessToken()}`,
            Accept: "application/vnd.github+json"
        }
    });
    const emails = await response.json();
    const primary = emails.find(e => e.primary && e.verified);

    if (!primary) {
        console.log("No primary email found for GitHub user");
        return handleFailedLogin();
    }
    
    const primaryEmail = primary.email;
    
    // find user and update github token
    const user = await User.findOneAndUpdate(
        { email: primaryEmail },
        {
            $set: {
                "platforms.github.url": `https://github.com/${githubUser.login}`,
                "platforms.github.accessToken": tokens.accessToken(),
                "platforms.github.oauthConnected": true,
                "platforms.github.connectedAt": new Date()
            }
        },
        { returnDocument: "after" }
    );
    
    if (!user) {
        console.log("No user found with email:", primaryEmail);
        return handleFailedLogin();
    }
    
    console.log("GitHub connected for:", user.email);

    // const reposResponse = await fetch(
    //     "https://api.github.com/user/repos?per_page=100&sort=updated",
    //     {
    //         headers: {
    //             Authorization: `Bearer ${tokens.accessToken()}`,
    //         },
    //     }
    // );
    // if (!reposResponse.ok) return handleFailedLogin();
    // const repos = await reposResponse.json();
    // const formattedRepos = await Promise.all(
    //     repos.map(async (repo) => {
    //         let repo_languages = {};

    //         try {
    //             const res = await fetch(
    //                 `https://api.github.com/repos/${githubUsername}/${repo.name}/languages`
    //             );

    //             if (res.ok) {
    //                 repo_languages = await res.json();
    //             }
    //         } catch (err) {
    //             console.error(`Failed to fetch languages for ${repo.name}`);
    //         }

    //         return {
    //             project_name: repo.name,
    //             description: repo.description || "",
    //             topics: repo.topics || [],
    //             primary_language: repo.language || null,
    //             repo_languages,

    //             created_at: repo.created_at,
    //             last_updated: repo.pushed_at,

    //             stars: repo.stargazers_count || 0,
    //             forks: repo.forks_count || 0,

    //             size: repo.size,
    //             default_branch: repo.default_branch
    //         };
        // })
    // );

    res.redirect(`${process.env.FRONTEND_URL}/auth/oauth?github=success`);
}

const disconnectGithub = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json(new ApiError(404, "User not found"));
        }
        await User.findByIdAndUpdate(req.user._id, {
            platforms: {
                ...user.platforms,
                github: {
                    url: "",
                    oauthConnected: false,
                    accessToken: "",
                    repos: [],
                    connectedAt: null
                }
            }
        })
        return res.status(200).json(new ApiResponse(200, null, "Github disconnected successfully"));
    }catch(err){
        console.log(err);
        return res.status(500).json(new ApiError(500, err.message))
    }
}

const fetchRepos = async (req,res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json(new ApiError(404, "User not found"));
    }
    const github = user.platforms['github'] || null;
    if (!github) {
        return res.status(404).json(new ApiError(404, "Github profile not found"));
    }
    const accessToken = github.accessToken;

    const reposResponse = await fetch(
        "https://api.github.com/user/repos?per_page=100&sort=updated",
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!reposResponse.ok) return handleFailedLogin();
    const repos = await reposResponse.json();
    const githubUsername = github.url.split("github.com/")[1];
    try{
        const formattedRepos = await Promise.all(
            repos.map(async (repo) => {
                let repo_languages = {};

                try {
                    const res = await fetch(
                        `https://api.github.com/repos/${githubUsername}/${repo.name}/languages`,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );

                    if (res.ok) {
                        repo_languages = await res.json();
                    }
                } catch (err) {
                    console.log(err)
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
                    default_branch: repo.default_branch
                };
            })
        );

        await User.findByIdAndUpdate(req.user._id, {
            platforms: {
                ...user.platforms,
                github: {
                    ...github,
                    repos: formattedRepos
                }
            }
        })  
        return res.status(200).json(new ApiResponse(200, formattedRepos, "Repos fetched and added successfully"));
    }catch(err){
        console.log(err);
        return res.status(500).json(new ApiError(500, err.message))
    }   
}

const generate3dModel = async (req, res) => {

}

export {
    getAllMyRepos,
    getGithubAuth,
    getGithubCallback,
    disconnectGithub,
    fetchRepos
}