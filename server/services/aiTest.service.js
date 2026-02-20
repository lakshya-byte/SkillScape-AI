import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";

/**
 * Shared LLM instance factory.
 */
function getLLM() {
    return new ChatOpenAI({
        modelName: "gpt-4o-mini",
        temperature: 0.4,
        apiKey: process.env.OPENAI_URI,
    });
}

/**
 * Safely parse JSON from an AI response, stripping code fences.
 */
function parseAIJSON(content) {
    const cleaned = content
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
    return JSON.parse(cleaned);
}

/* ──────────────────────────────────────────────────────────────────
 *  Generate Test Questions
 * ──────────────────────────────────────────────────────────────── */
export async function generateTest(topic, difficulty, totalQuestions) {
    const llm = getLLM();

    const prompt = `You are an expert technical interviewer and educator.

Generate exactly ${totalQuestions} multiple-choice questions about "${topic}" at "${difficulty}" difficulty level.

Return a valid JSON object with EXACTLY this structure (no markdown, no code fences, just raw JSON):

{
  "questions": [
    {
      "id": "q1",
      "question": "What is ...?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "explanation": "Explanation of why this answer is correct...",
      "difficulty": "${difficulty}",
      "tags": ["${topic}", "relevant-subtopic"]
    }
  ]
}

Rules:
- Each question MUST have exactly 4 options
- correctAnswer MUST be one of the 4 options (exact string match)
- explanation should be 1-2 sentences explaining the correct answer
- id must be sequential: q1, q2, q3, ...
- tags should include the main topic and relevant subtopics
- Questions should cover different aspects of ${topic}
- For ${difficulty} difficulty:
  ${difficulty === "beginner" ? "- Basic concepts, definitions, simple use cases" : ""}
  ${difficulty === "intermediate" ? "- Applied knowledge, common patterns, practical scenarios" : ""}
  ${difficulty === "advanced" ? "- Deep internals, edge cases, architecture decisions" : ""}
  ${difficulty === "expert" ? "- Expert-level: system design, performance tuning, obscure internals" : ""}

Respond ONLY with the JSON object.`;

    const response = await llm.invoke([new HumanMessage(prompt)]);
    const parsed = parseAIJSON(response.content);
    return parsed.questions || [];
}

/* ──────────────────────────────────────────────────────────────────
 *  Generate AI Review
 * ──────────────────────────────────────────────────────────────── */
export async function generateReview(test, answers, score, totalQuestions) {
    const llm = getLLM();

    // Build context of which questions were right/wrong
    const breakdown = test.questions.map((q) => {
        const userAnswer = answers.find((a) => a.questionId === q.id);
        return {
            question: q.question,
            correctAnswer: q.correctAnswer,
            userAnswer: userAnswer?.selectedAnswer || "No answer",
            isCorrect: userAnswer?.isCorrect || false,
            tags: q.tags,
        };
    });

    const prompt = `You are an expert technical mentor providing a personalized test review.

A user just completed a ${test.difficulty}-level test on "${test.topic}".
They scored ${score}/${totalQuestions} (${Math.round((score / totalQuestions) * 100)}%).

Here is the full breakdown:

${JSON.stringify(breakdown, null, 2)}

Analyze their performance and return a valid JSON object with EXACTLY this structure:

{
  "strengths": ["strength1", "strength2", ...],
  "weaknesses": ["weakness1", "weakness2", ...],
  "improvementAreas": ["area1", "area2", ...],
  "recommendations": ["recommendation1", "recommendation2", ...],
  "summary": "A 2-3 sentence personalized summary of the user's performance."
}

Rules:
- strengths: 2-4 specific areas where the user demonstrated knowledge
- weaknesses: 2-4 specific areas where the user struggled
- improvementAreas: 2-4 specific subtopics the user should study
- recommendations: 3-5 actionable next steps (courses, practice, projects)
- summary: A brief, encouraging, and honest assessment

If the user scored perfectly, still give constructive recommendations for growth.

Respond ONLY with the JSON object.`;

    const response = await llm.invoke([new HumanMessage(prompt)]);
    return parseAIJSON(response.content);
}
