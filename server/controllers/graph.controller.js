import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ─────────────────────────────────────────────────────────────────
// SHARED: Call n8n and parse + validate its response
// ─────────────────────────────────────────────────────────────────
async function callN8nAndParseGraph(user) {
  const webhookUrl = process.env.n8n_WEBHOOK_URL;
  if (!webhookUrl) {
    throw Object.assign(new Error("n8n webhook URL is not configured"), {
      status: 500,
    });
  }

  const payload = {
    userId: user._id.toString(),
    name: user.name,
    repos: user.platforms?.github?.repos || [],
  };

  let n8nResponse;
  try {
    n8nResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (fetchErr) {
    console.error("n8n fetch error:", fetchErr.message);
    throw Object.assign(
      new Error("Could not reach n8n workflow. Ensure n8n is running."),
      { status: 502 },
    );
  }

  if (!n8nResponse.ok) {
    console.error("n8n returned status:", n8nResponse.status);
    throw Object.assign(
      new Error(`n8n webhook returned status ${n8nResponse.status}`),
      { status: 502 },
    );
  }

  // Parse response — n8n can return several shapes
  const rawBody = await n8nResponse.json();
  let graphPayload;

  if (rawBody?.graphData?.output) {
    graphPayload =
      typeof rawBody.graphData.output === "string"
        ? JSON.parse(rawBody.graphData.output)
        : rawBody.graphData.output;
  } else if (rawBody?.graph) {
    graphPayload = rawBody;
  } else if (rawBody?.skills) {
    graphPayload = { graph: rawBody.skills };
  } else if (rawBody?.nodes) {
    graphPayload = { graph: rawBody };
  } else {
    console.error(
      "Unexpected n8n shape:",
      JSON.stringify(rawBody).slice(0, 500),
    );
    throw Object.assign(
      new Error("n8n returned an unrecognized response format"),
      { status: 502 },
    );
  }

  const graph = graphPayload.skills || graphPayload.graph || graphPayload;

  // Validate
  if (!graph.nodes || !Array.isArray(graph.nodes) || graph.nodes.length === 0) {
    throw Object.assign(new Error("n8n returned a graph with no nodes"), {
      status: 502,
    });
  }
  if (!graph.links || !Array.isArray(graph.links)) {
    graph.links = [];
  }

  return graph;
}

// ─────────────────────────────────────────────────────────────────
// SHARED: Save graph into user.skills
// ─────────────────────────────────────────────────────────────────
async function saveGraphToUser(user, graph) {
  user.skills = {
    nodes: graph.nodes,
    links: graph.links,
    metadata: graph.metadata || {
      totalNodes: graph.nodes.length,
      totalLinks: graph.links.length,
      generationTimestamp: new Date(),
      isPartialGraph: false,
    },
    visualConfig: graph.visualConfig || undefined,
    interactionConfig: graph.interactionConfig || undefined,
    futurePotential: graph.futurePotential || [],
  };
  await user.save();
}

// ─────────────────────────────────────────────────────────────────
// GET /api/graph/generate/:userId
// Returns cached graph OR generates a new one via n8n
// ─────────────────────────────────────────────────────────────────
const generateKnowledgeGraph = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }

    // Return cached graph if it exists
    if (
      user.skills &&
      Array.isArray(user.skills.nodes) &&
      user.skills.nodes.length > 0
    ) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { graph: user.skills },
            "Graph loaded from cache",
          ),
        );
    }

    // Generate via n8n
    const graph = await callN8nAndParseGraph(user);
    await saveGraphToUser(user, graph);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { graph: user.skills },
          "Knowledge graph generated",
        ),
      );
  } catch (error) {
    console.error("Graph generation error:", error);
    const status = error.status || 500;
    return res.status(status).json(new ApiError(status, error.message));
  }
};

// ─────────────────────────────────────────────────────────────────
// POST /api/graph/regenerate/:userId
// ALWAYS force-regenerates graph via n8n (ignores cache)
// ─────────────────────────────────────────────────────────────────
const regenerateKnowledgeGraph = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }

    // Always call n8n — never return cache
    const graph = await callN8nAndParseGraph(user);
    await saveGraphToUser(user, graph);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { graph: user.skills },
          "Knowledge graph regenerated",
        ),
      );
  } catch (error) {
    console.error("Graph regeneration error:", error);
    const status = error.status || 500;
    return res.status(status).json(new ApiError(status, error.message));
  }
};

export { generateKnowledgeGraph, regenerateKnowledgeGraph };
