import axios from "axios";

// ─── Centralized Axios Instance ─────────────────────────────────
// Reads from .env.local — never hardcode the backend URL elsewhere.
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// ─── Response Interceptor ───────────────────────────────────────
// Extracts a clean error message from any API failure.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message ||
            error.message ||
            "An unexpected error occurred";

        return Promise.reject(new Error(message));
    }
);

export default api;
