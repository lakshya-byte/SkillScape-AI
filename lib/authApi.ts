import api from "./api";

// ─── Types ──────────────────────────────────────────────────────
type LoginCredentials = {
    email: string;
    password: string;
};

type RegisterData = {
    name: string;
    email: string;
    password: string;
    institute: string;
    avatar: string;
    links: {
        github: string;
        linkedin: string;
        leetcode: string;
        behance: string;
    };
};

// ─── Auth API Layer ─────────────────────────────────────────────

export const loginUser = async (credentials: LoginCredentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
};

export const registerUser = async (data: RegisterData) => {
    const response = await api.post("/auth/register", data);
    return response.data;
};

export const logoutUser = async () => {
    const response = await api.get("/auth/logout");
    return response.data;
};

export const getMyself = async () => {
    const response = await api.get("/user/me");
    return response.data;
};

export const updateAvatar = async (avatar: string) => {
    const response = await api.post("/user/updateUser", { avatar });
    return response.data;
};

// ─── Password Reset API Layer ───────────────────────────────────

export const sendResetOTP = async (email: string) => {
    const response = await api.post("/auth/send-reset-otp", { email });
    return response.data;
};

export const verifyResetOTP = async (email: string, otp: string) => {
    const response = await api.post("/auth/verify-reset-otp", { email, otp });
    return response.data;
};

export const resetPassword = async (email: string, otp: string, newPassword: string) => {
    const response = await api.post("/auth/reset-password", { email, otp, newPassword });
    return response.data;
};

// ─── Agent Chat API Layer (SSE Streaming) ───────────────────────

export async function* streamAgentChat(message: string, conversationId?: string) {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

    const response = await fetch(`${baseURL}/agent/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message, conversationId }),
    });

    if (!response.ok) {
        throw new Error("Failed to connect to VelionAI agent");
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error("No response stream");

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
            if (line.startsWith("data: ")) {
                const data = line.slice(6).trim();
                if (data === "[DONE]") return;
                try {
                    yield JSON.parse(data);
                } catch {
                    // skip malformed chunks
                }
            }
        }
    }
}
