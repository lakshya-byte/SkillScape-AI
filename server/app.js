import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error.middleware.js";

import friendRouter from "./routes/friend.route.js";
import graphRouter from "./routes/graph.route.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import githubRouter from "./routes/github.route.js";
import notionRouter from "./routes/notion.route.js";
import paymentRouter from "./routes/payment.route.js";
import resetPasswordRouter from "./routes/resetPassword.route.js";
import agentRouter from "./routes/agent.route.js";
import roadmapRouter from "./routes/roadmap.route.js";
import chatRouter from "./routes/chat.route.js";

const app = express();

app.set("trust proxy", 1);
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  }),
);

// app.use(express.json({ limit: "20kb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/friends", friendRouter);
app.use("/api/graph", graphRouter);
app.use("/api/auth", authRouter);
app.use("/api/reset-password", resetPasswordRouter);
app.use("/api/user", userRouter);
app.use("/api/agent", agentRouter);
app.use("/github", githubRouter);
app.use("/notion", notionRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/roadmaps", roadmapRouter);
app.use("/api/chats", chatRouter);

app.use(errorHandler);

export { app };
// force restart
