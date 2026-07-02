import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";


import apiLimiter from "./middleware/rateLimiter.js";
import errorHandler from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",

    uptime: process.uptime(),
  });
});

app.use(helmet());
app.use(errorHandler);
app.use(apiLimiter);

app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/dashboard", dashboardRoutes);


export default app;
