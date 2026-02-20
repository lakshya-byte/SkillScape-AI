import { FriendRequest } from "../models/FriendRequest.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// POST /api/friends/request/:userId
const sendRequest = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.userId;

    // Can't friend yourself
    if (senderId.toString() === receiverId.toString()) {
      return res
        .status(400)
        .json(
          new ApiError(400, "You cannot send a friend request to yourself"),
        );
    }

    // Check receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }

    // Check if a request already exists in either direction
    const existing = await FriendRequest.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    if (existing) {
      if (existing.status === "accepted") {
        return res
          .status(409)
          .json(new ApiError(409, "You are already friends"));
      }
      if (existing.status === "pending") {
        return res
          .status(409)
          .json(
            new ApiError(
              409,
              "A friend request already exists between you two",
            ),
          );
      }
      // If rejected, allow re-sending by updating the old record
      if (existing.status === "rejected") {
        existing.sender = senderId;
        existing.receiver = receiverId;
        existing.status = "pending";
        await existing.save();
        return res
          .status(200)
          .json(new ApiResponse(200, existing, "Friend request sent"));
      }
    }

    const request = await FriendRequest.create({
      sender: senderId,
      receiver: receiverId,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, request, "Friend request sent"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, error.message));
  }
};

// PATCH /api/friends/accept/:requestId
const acceptRequest = async (req, res) => {
  try {
    const request = await FriendRequest.findById(req.params.requestId);
    if (!request) {
      return res
        .status(404)
        .json(new ApiError(404, "Friend request not found"));
    }

    // Only the receiver can accept
    if (request.receiver.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json(new ApiError(403, "You can only accept requests sent to you"));
    }

    if (request.status !== "pending") {
      return res
        .status(400)
        .json(new ApiError(400, `Request is already ${request.status}`));
    }

    request.status = "accepted";
    await request.save();

    return res
      .status(200)
      .json(new ApiResponse(200, request, "Friend request accepted"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, error.message));
  }
};

// PATCH /api/friends/reject/:requestId
const rejectRequest = async (req, res) => {
  try {
    const request = await FriendRequest.findById(req.params.requestId);
    if (!request) {
      return res
        .status(404)
        .json(new ApiError(404, "Friend request not found"));
    }

    if (request.receiver.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json(new ApiError(403, "You can only reject requests sent to you"));
    }

    if (request.status !== "pending") {
      return res
        .status(400)
        .json(new ApiError(400, `Request is already ${request.status}`));
    }

    request.status = "rejected";
    await request.save();

    return res
      .status(200)
      .json(new ApiResponse(200, request, "Friend request rejected"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, error.message));
  }
};

// DELETE /api/friends/cancel/:requestId
const cancelRequest = async (req, res) => {
  try {
    const request = await FriendRequest.findById(req.params.requestId);
    if (!request) {
      return res
        .status(404)
        .json(new ApiError(404, "Friend request not found"));
    }

    if (request.sender.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json(new ApiError(403, "You can only cancel requests you sent"));
    }

    if (request.status !== "pending") {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            `Cannot cancel a request that is already ${request.status}`,
          ),
        );
    }

    await FriendRequest.findByIdAndDelete(request._id);

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Friend request cancelled"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, error.message));
  }
};

// DELETE /api/friends/unfriend/:userId
const unfriend = async (req, res) => {
  try {
    const myId = req.user._id;
    const otherId = req.params.userId;

    const friendship = await FriendRequest.findOneAndDelete({
      status: "accepted",
      $or: [
        { sender: myId, receiver: otherId },
        { sender: otherId, receiver: myId },
      ],
    });

    if (!friendship) {
      return res.status(404).json(new ApiError(404, "Friendship not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Unfriended successfully"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, error.message));
  }
};

// GET /api/friends
const getMyFriends = async (req, res) => {
  try {
    const myId = req.user._id;

    const friendships = await FriendRequest.find({
      status: "accepted",
      $or: [{ sender: myId }, { receiver: myId }],
    })
      .populate("sender", "name email avatar institute")
      .populate("receiver", "name email avatar institute");

    const friends = friendships.map((f) => {
      const friend =
        f.sender._id.toString() === myId.toString() ? f.receiver : f.sender;
      return {
        _id: friend._id,
        name: friend.name,
        email: friend.email,
        avatar: friend.avatar,
        institute: friend.institute,
        since: f.updatedAt,
      };
    });

    return res
      .status(200)
      .json(new ApiResponse(200, friends, "Friends fetched successfully"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, error.message));
  }
};

// GET /api/friends/pending
const getPendingRequests = async (req, res) => {
  try {
    const myId = req.user._id;

    const incoming = await FriendRequest.find({
      receiver: myId,
      status: "pending",
    }).populate("sender", "name email avatar institute");

    const outgoing = await FriendRequest.find({
      sender: myId,
      status: "pending",
    }).populate("receiver", "name email avatar institute");

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { incoming, outgoing },
          "Pending requests fetched",
        ),
      );
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, error.message));
  }
};

// GET /api/friends/search?q=...
const searchPeople = async (req, res) => {
  try {
    const { q } = req.query;
    const myId = req.user._id;

    // Build query filter — if q is provided, search; otherwise return all users
    const filter = { _id: { $ne: myId } };
    if (q && q.trim().length > 0) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ];
    }

    const users = await User.find(filter)
      .select("name email avatar institute role")
      .limit(30);

    if (users.length === 0) {
      return res.status(200).json(new ApiResponse(200, [], "No users found"));
    }

    // Get all friend requests involving the current user and any of the results
    const userIds = users.map((u) => u._id);
    const requests = await FriendRequest.find({
      $or: [
        { sender: myId, receiver: { $in: userIds } },
        { receiver: myId, sender: { $in: userIds } },
      ],
    });

    // Build a map of userId -> friendship status
    const statusMap = {};
    for (const req of requests) {
      const otherId =
        req.sender.toString() === myId.toString()
          ? req.receiver.toString()
          : req.sender.toString();

      if (req.status === "accepted") {
        statusMap[otherId] = { status: "friends", requestId: req._id };
      } else if (req.status === "pending") {
        statusMap[otherId] = {
          status:
            req.sender.toString() === myId.toString()
              ? "pending_sent"
              : "pending_received",
          requestId: req._id,
        };
      }
      // rejected = treat as "none" so they can re-send
    }

    const results = users.map((u) => ({
      _id: u._id,
      name: u.name,
      email: u.email,
      avatar: u.avatar,
      institute: u.institute,
      role: u.role,
      friendshipStatus: statusMap[u._id.toString()]?.status || "none",
      requestId: statusMap[u._id.toString()]?.requestId || null,
    }));

    return res
      .status(200)
      .json(new ApiResponse(200, results, "Search results"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export {
  sendRequest,
  acceptRequest,
  rejectRequest,
  cancelRequest,
  unfriend,
  getMyFriends,
  getPendingRequests,
  searchPeople,
};
