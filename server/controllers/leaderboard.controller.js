import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { calculateRating } from "../utils/calculateRating.js";

/**
 * GET /api/leaderboard?page=1&limit=10
 * Recalculates ratings for all users, then returns a paginated, ranked list.
 */
const getLeaderboard = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    // ── Recalculate & persist ratings for every user ──────────────
    const allUsers = await User.find({}).select("skills rating");

    const bulkOps = [];
    for (const u of allUsers) {
      const newRating = calculateRating(u);
      if (u.rating !== newRating) {
        bulkOps.push({
          updateOne: {
            filter: { _id: u._id },
            update: { $set: { rating: newRating } },
          },
        });
      }
    }
    if (bulkOps.length > 0) {
      await User.bulkWrite(bulkOps);
    }

    // ── Fetch ranked users (paginated) ───────────────────────────
    const totalUsers = await User.countDocuments({});
    const totalPages = Math.ceil(totalUsers / limit);

    const users = await User.find({})
      .sort({ rating: -1, createdAt: 1 })
      .skip(skip)
      .limit(limit)
      .select("name avatar role institute rating skills.nodes");

    // ── Build response ───────────────────────────────────────────
    const leaderboard = users.map((u, idx) => {
      const skillNodes = (u.skills?.nodes || []).filter(
        (n) => n.type === "SKILL",
      );
      const projectNodes = (u.skills?.nodes || []).filter(
        (n) => n.type === "PROJECT",
      );

      // Top 3 skills sorted by level desc
      const topSkills = skillNodes
        .sort((a, b) => (b.metrics?.level || 0) - (a.metrics?.level || 0))
        .slice(0, 3)
        .map((n) => n.displayName || n.id);

      return {
        rank: skip + idx + 1,
        _id: u._id,
        name: u.name,
        avatar: u.avatar,
        role: u.role,
        institute: u.institute,
        rating: u.rating,
        topSkills,
        totalSkills: skillNodes.length,
        totalProjects: projectNodes.length,
      };
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          leaderboard,
          pagination: {
            page,
            limit,
            totalUsers,
            totalPages,
          },
        },
        "Leaderboard fetched successfully",
      ),
    );
  } catch (error) {
    console.error("Leaderboard error:", error);
    return res.status(500).json(new ApiError(500, error.message));
  }
};

/**
 * GET /api/leaderboard/me
 * Returns the current user's rank and rating.
 */
const getMyRank = async (req, res) => {
  try {
    const myId = req.user._id;

    // Recalculate my rating
    const me = await User.findById(myId);
    if (!me) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }

    const myRating = calculateRating(me);
    if (me.rating !== myRating) {
      await User.findByIdAndUpdate(myId, { rating: myRating });
    }

    // Count how many users have a higher rating
    const usersAbove = await User.countDocuments({ rating: { $gt: myRating } });
    const rank = usersAbove + 1;
    const totalUsers = await User.countDocuments({});

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          rank,
          rating: myRating,
          totalUsers,
          name: me.name,
          avatar: me.avatar,
        },
        "Your rank fetched successfully",
      ),
    );
  } catch (error) {
    console.error("MyRank error:", error);
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export { getLeaderboard, getMyRank };
