/**
 * Calculates a user's rating from their skills graph nodes.
 *
 * Formula per SKILL node:
 *   (level × 10) + (confidenceScore × 5) + (min(githubCommits, 500) × 0.1) + (experienceYears × 8)
 *
 * Total rating = sum across all SKILL-type nodes, rounded to nearest integer.
 */
export function calculateRating(user) {
    const nodes = user?.skills?.nodes;
    if (!nodes || !Array.isArray(nodes) || nodes.length === 0) {
        return 0;
    }

    let total = 0;

    for (const node of nodes) {
        if (node.type !== "SKILL") continue;

        const m = node.metrics || {};
        const level = Number(m.level) || 0;
        const confidence = Number(m.confidenceScore) || 0;
        const commits = Math.min(Number(m.githubCommits) || 0, 500);
        const years = Number(m.experienceYears) || 0;

        total += level * 10 + confidence * 5 + commits * 0.1 + years * 8;
    }

    return Math.round(total);
}
