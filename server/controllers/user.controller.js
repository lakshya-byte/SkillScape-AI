import { User } from "../models/User.model.js"
import { FriendRequest } from "../models/FriendRequest.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const getMyself = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password -refreshToken");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching user",
            error: error.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const allowedUpdates = [
            "name",
            "avatar",
            "role",
            "institute",
            "platforms"
        ];

        const updates = {};
        for (let key of allowedUpdates) {
            if (req.body[key] !== undefined) {
                updates[key] = req.body[key];
            }
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            updates,
            {
                new: true,
                runValidators: true
            }
        ).select("-password -refreshToken");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating user",
            error: error.message
        });
    }
};

// GET /api/user/search?q=...
// Returns surface info for non-friends, extended info for friends
const searchUser = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || q.trim().length === 0) {
            return res.status(400).json(new ApiError(400, "Search query is required"));
        }

        const myId = req.user._id;

        const users = await User.find({
            _id: { $ne: myId },
            $or: [
                { name: { $regex: q, $options: "i" } },
                { email: { $regex: q, $options: "i" } }
            ]
        })
            .select("-password -refreshToken")
            .limit(15);

        if (users.length === 0) {
            return res.status(200).json(new ApiResponse(200, [], "No users found"));
        }

        // Find which of these users are friends with the current user
        const userIds = users.map(u => u._id);
        const friendships = await FriendRequest.find({
            status: "accepted",
            $or: [
                { sender: myId, receiver: { $in: userIds } },
                { receiver: myId, sender: { $in: userIds } }
            ]
        });

        const friendSet = new Set();
        for (const f of friendships) {
            const otherId = f.sender.toString() === myId.toString()
                ? f.receiver.toString()
                : f.sender.toString();
            friendSet.add(otherId);
        }

        const results = users.map(u => {
            const isFriend = friendSet.has(u._id.toString());

            if (isFriend) {
                // Friends get extended info
                return {
                    _id: u._id,
                    name: u.name,
                    email: u.email,
                    avatar: u.avatar,
                    role: u.role,
                    institute: u.institute,
                    platforms: u.platforms,
                    lastSync: u.lastSync,
                    isFriend: true
                };
            } else {
                // Non-friends get surface info only
                return {
                    _id: u._id,
                    name: u.name,
                    avatar: u.avatar,
                    role: u.role,
                    institute: u.institute,
                    isFriend: false
                };
            }
        });

        return res.status(200).json(new ApiResponse(200, results, "Search results"));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiError(500, error.message));
    }
};

export {
    getMyself,
    updateUser,
    searchUser
}