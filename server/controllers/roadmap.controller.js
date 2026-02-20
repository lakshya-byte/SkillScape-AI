import { Roadmap } from "../models/Roadmap.model.js";
import openai from "../lib/openai.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ─── System prompt for roadmap generation ────────────────────────
const ROADMAP_SYSTEM_PROMPT = `You are a roadmap architect AI. Given a user's prompt, generate a structured learning/project roadmap as a JSON object.

RULES:
- Generate 8-15 nodes depending on complexity
- Each node must have: id (string like "node_1"), title (short), description (1-2 sentences), level (0 = root, 1 = primary branches, 2 = secondary, 3 = leaves)
- Edges connect nodes logically: source → target
- Edge ids must be "edge_<source>_<target>"
- The graph must be a valid DAG (directed acyclic graph)
- Start with a single root node (level 0)
- Branch into 2-4 primary topics (level 1)
- Each primary can have 1-3 subtopics (level 2-3)
- Make titles concise (2-5 words)
- Make descriptions actionable and specific

OUTPUT FORMAT (strict JSON, no markdown):
{
  "title": "Roadmap Title",
  "nodes": [
    { "id": "node_1", "title": "...", "description": "...", "level": 0 }
  ],
  "edges": [
    { "id": "edge_node_1_node_2", "source": "node_1", "target": "node_2" }
  ]
}

Output ONLY the JSON object. No explanation, no markdown fences.`;

// ─── 1. Create Roadmap ──────────────────────────────────────────
export const createRoadmap = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || !prompt.trim()) {
      return res.status(400).json(new ApiError(400, "Prompt is required"));
    }

    const roadmap = new Roadmap({
      userId: req.user._id,
      title: prompt.slice(0, 80),
      prompt,
      graph: { nodes: [], edges: [] },
      status: "generating",
    });

    await roadmap.save();

    return res
      .status(201)
      .json(
        new ApiResponse(201, { roadmapId: roadmap._id }, "Roadmap created"),
      );
  } catch (error) {
    console.error("Create roadmap error:", error);
    return res.status(500).json(new ApiError(500, "Failed to create roadmap"));
  }
};

// ─── 2. Get All User Roadmaps ───────────────────────────────────
export const getRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ userId: req.user._id })
      .select("title prompt status createdAt graph.nodes graph.edges")
      .sort({ createdAt: -1 })
      .lean();

    const result = roadmaps.map((r) => ({
      _id: r._id,
      title: r.title,
      status: r.status,
      createdAt: r.createdAt,
      nodeCount: r.graph?.nodes?.length || 0,
      edgeCount: r.graph?.edges?.length || 0,
    }));

    return res
      .status(200)
      .json(new ApiResponse(200, result, "Roadmaps retrieved"));
  } catch (error) {
    console.error("Get roadmaps error:", error);
    return res.status(500).json(new ApiError(500, "Failed to get roadmaps"));
  }
};

// ─── 3. Get Single Roadmap ──────────────────────────────────────
export const getRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).lean();

    if (!roadmap) {
      return res.status(404).json(new ApiError(404, "Roadmap not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, roadmap, "Roadmap retrieved"));
  } catch (error) {
    console.error("Get roadmap error:", error);
    return res.status(500).json(new ApiError(500, "Failed to get roadmap"));
  }
};

// ─── 4. Stream Roadmap Generation (SSE) ─────────────────────────
export const streamRoadmap = async (req, res) => {
  const roadmapId = req.params.id;

  try {
    const roadmap = await Roadmap.findOne({
      _id: roadmapId,
      userId: req.user._id,
    });

    if (!roadmap) {
      return res.status(404).json(new ApiError(404, "Roadmap not found"));
    }

    // If already completed, send graph instantly and close
    if (roadmap.status === "completed" && roadmap.graph.nodes.length > 0) {
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      });

      for (const node of roadmap.graph.nodes) {
        res.write(
          `data: ${JSON.stringify({ type: "node", payload: node })}\n\n`,
        );
      }
      for (const edge of roadmap.graph.edges) {
        res.write(
          `data: ${JSON.stringify({ type: "edge", payload: edge })}\n\n`,
        );
      }
      res.write(`data: ${JSON.stringify({ type: "done" })}\n\n`);
      res.end();
      return;
    }

    // ── SSE headers ──
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    // ── Call OpenAI (non-streaming, structured JSON output) ──
    let fullResponse = "";

    try {
      const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: ROADMAP_SYSTEM_PROMPT },
          { role: "user", content: roadmap.prompt },
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 4096,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          fullResponse += content;
        }
      }
    } catch (aiError) {
      console.error("OpenAI error:", aiError);
      res.write(
        `data: ${JSON.stringify({ type: "error", message: "AI generation failed" })}\n\n`,
      );
      res.end();
      return;
    }

    // ── Parse the complete JSON response ──
    let parsed;
    try {
      // Strip markdown fences if present
      let cleaned = fullResponse.trim();
      if (cleaned.startsWith("```")) {
        cleaned = cleaned
          .replace(/^```(?:json)?\n?/, "")
          .replace(/\n?```$/, "");
      }
      parsed = JSON.parse(cleaned);
    } catch (parseError) {
      console.error("JSON parse error:", parseError, "\nRaw:", fullResponse);
      res.write(
        `data: ${JSON.stringify({ type: "error", message: "Failed to parse roadmap data" })}\n\n`,
      );
      res.end();
      return;
    }

    const { nodes = [], edges = [], title } = parsed;

    // Update title if AI provided a better one
    if (title) {
      roadmap.title = title;
    }

    // ── Stream nodes progressively with delay ──
    const STREAM_DELAY = 300; // ms between each event

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      // Calculate auto-layout position (hierarchical DAG)
      const levelNodes = nodes.filter((n) => n.level === node.level);
      const indexInLevel = levelNodes.indexOf(node);
      const totalInLevel = levelNodes.length;

      node.position = {
        x: (indexInLevel - (totalInLevel - 1) / 2) * 280,
        y: node.level * 200,
      };

      // Save to DB
      roadmap.graph.nodes.push(node);

      // Stream to client
      res.write(`data: ${JSON.stringify({ type: "node", payload: node })}\n\n`);

      // Simulate progressive generation feel
      await new Promise((resolve) => setTimeout(resolve, STREAM_DELAY));
    }

    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];

      roadmap.graph.edges.push(edge);

      res.write(`data: ${JSON.stringify({ type: "edge", payload: edge })}\n\n`);

      await new Promise((resolve) => setTimeout(resolve, STREAM_DELAY / 2));
    }

    // ── Finalize ──
    roadmap.status = "completed";
    await roadmap.save();

    res.write(`data: ${JSON.stringify({ type: "done" })}\n\n`);
    res.end();
  } catch (error) {
    console.error("Stream roadmap error:", error);
    if (!res.headersSent) {
      return res.status(500).json(new ApiError(500, "Streaming failed"));
    }
    res.write(
      `data: ${JSON.stringify({ type: "error", message: "Internal server error" })}\n\n`,
    );
    res.end();
  }
};

// ─── 5. Toggle Node Completion ──────────────────────────────────
export const toggleNodeCompletion = async (req, res) => {
  try {
    const { id: roadmapId, nodeId } = req.params;

    const roadmap = await Roadmap.findOne({
      _id: roadmapId,
      userId: req.user._id,
    });

    if (!roadmap) {
      return res.status(404).json(new ApiError(404, "Roadmap not found"));
    }

    // Validate that the nodeId actually exists in the graph
    const nodeExists = roadmap.graph.nodes.some((n) => n.id === nodeId);
    if (!nodeExists) {
      return res
        .status(404)
        .json(new ApiError(404, "Node not found in roadmap"));
    }

    // Toggle: if already completed → remove, else → add
    const isCompleted = roadmap.completedNodeIds.includes(nodeId);

    if (isCompleted) {
      roadmap.completedNodeIds = roadmap.completedNodeIds.filter(
        (id) => id !== nodeId,
      );
    } else {
      roadmap.completedNodeIds.push(nodeId);
    }

    await roadmap.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          nodeId,
          completed: !isCompleted,
          completedNodeIds: roadmap.completedNodeIds,
          progress: {
            completed: roadmap.completedNodeIds.length,
            total: roadmap.graph.nodes.length,
          },
        },
        `Node ${!isCompleted ? "completed" : "uncompleted"}`,
      ),
    );
  } catch (error) {
    console.error("Toggle node completion error:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Failed to toggle node completion"));
  }
};
