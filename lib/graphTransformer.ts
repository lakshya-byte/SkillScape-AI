/**
 * Graph Transformer Layer
 *
 * Converts backend MongoDB skills graph format (user.skills)
 * into the IntelligenceNode/IntelligenceLink format expected
 * by the StudentSkillIntelligenceGraph renderer.
 *
 * Backend format:  user.skills.nodes / user.skills.links
 * Renderer format: GraphData { nodes: IntelligenceNode[], links: IntelligenceLink[] }
 */

// --- Types: Backend Schema ---

interface BackendNode {
    id: string;
    displayName: string;
    type: "USER" | "SKILL" | "PROJECT" | "DOMAIN" | "PLATFORM";
    description?: string;
    metrics?: {
        level?: number;
        githubCommits?: number;
        experienceYears?: number;
        confidenceScore?: number;
    };
    interaction?: {
        route?: string;
        hasExpandableChildren?: boolean;
    };
    visuals?: {
        category?: string;
        colorHex?: string;
        iconType?: string;
    };
}

interface BackendLink {
    id?: string;
    source: string;
    target: string;
    relationshipType?: string;
    strengthValue?: number;
    confidenceScore?: number;
}

interface BackendSkillsGraph {
    nodes: BackendNode[];
    links: BackendLink[];
    metadata?: Record<string, unknown>;
    visualConfig?: Record<string, unknown>;
}

// --- Types: Frontend Renderer ---

export type NodeType = "USER" | "SKILL" | "DOMAIN" | "PLATFORM" | "PROJECT";

export interface IntelligenceNode {
    id: string;
    name: string;
    type: NodeType;
    description: string;
    level: number;
    commits: number;
    experience: number;
    confidence: number;
    route: string;
    color: string;
    val: number;
    x?: number;
    y?: number;
    z?: number;
}

export interface IntelligenceLink {
    source: string | IntelligenceNode;
    target: string | IntelligenceNode;
    value: number;
}

export interface GraphData {
    nodes: IntelligenceNode[];
    links: IntelligenceLink[];
}

// --- Color Defaults (by node type) ---

const TYPE_COLORS: Record<string, string> = {
    USER: "#00F0FF",
    SKILL: "#7C3AED",
    DOMAIN: "#FF6B6B",
    PLATFORM: "#F0F6FC",
    PROJECT: "#A020F0",
};

// --- Transformer ---

export function transformSkillsGraph(
    backendGraph: BackendSkillsGraph,
): GraphData {
    if (
        !backendGraph ||
        !backendGraph.nodes ||
        backendGraph.nodes.length === 0
    ) {
        return { nodes: [], links: [] };
    }

    const nodes: IntelligenceNode[] = backendGraph.nodes.map((node) => {
        const level = node.metrics?.level ?? 0;
        const color =
            node.visuals?.colorHex || TYPE_COLORS[node.type] || "#7C3AED";

        return {
            id: node.id,
            name: node.displayName || node.id,
            type: (node.type as NodeType) || "SKILL",
            description: node.description || "",
            level,
            commits: node.metrics?.githubCommits ?? 0,
            experience: node.metrics?.experienceYears ?? 0,
            confidence: node.metrics?.confidenceScore ?? 0,
            route: node.interaction?.route || `/skills/${node.id}`,
            color,
            val: Math.max(6, level / 4),
        };
    });

    const nodeIdSet = new Set(nodes.map((n) => n.id));

    const links: IntelligenceLink[] = backendGraph.links
        .filter((link) => nodeIdSet.has(link.source) && nodeIdSet.has(link.target))
        .map((link) => ({
            source: link.source,
            target: link.target,
            value: (link.strengthValue ?? 5) * 10,
        }));

    return { nodes, links };
}
