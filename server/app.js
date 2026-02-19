import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error.middleware.js";

import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import githubRouter from "./routes/github.route.js"
import notionRouter from "./routes/notion.route.js"
import paymentRouter from "./routes/payment.route.js"

const app = express();

app.set("trust proxy", 1);
app.use(
	cors({
		origin: ["http://localhost:5173", "http://localhost:3000"],
		credentials: true,
	})
);

// app.use(express.json({ limit: "20kb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/github",githubRouter)
app.use("/notion",notionRouter)
app.use("/api/payments", paymentRouter)


app.use(errorHandler);

export { app };
