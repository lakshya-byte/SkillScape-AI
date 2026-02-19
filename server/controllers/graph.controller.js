import { User } from "../models/User.model.js";
import { ApiError } from "next/dist/server/api-utils/index.js";

const generateKnowledgeGraph = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json(new ApiError(404, "User not found"));
        }

        const response = await fetch(
            `${process.env.n8n_WEBHOOK_URL}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: user._id,
                    name: user.name,
                    repos: user.platforms.github?.repos || [],
                })
            }
        );

        if (!response.ok) {
            return res.status(500).json(new ApiError(500, "Failed to generate knowledge graph"));
        }

        const graphData = await response.json();
        const raw = graphData.graphData.output;
        const parsed = await JSON.parse(raw);

        user.skills = parsed["skills"] || [];
        await user.save();

        // 5. Send response
        res.status(200).json({
            message: "Knowledge graph generated",
            graph: parsed
        });

    } catch (error) {
        console.error("Graph generation error:", error);
        res.status(500).json({
            message: "Failed to generate knowledge graph",
            error: error.message
        });
    }
};

export { generateKnowledgeGraph };