import dotenv from "dotenv";
dotenv.config();

console.log("GROQ:", process.env.GROQ_API_KEY);

import http from "http";

import app from "./app.js";

import connectDB from "./config/db.js";

import {
  initializeSocket,
} from "./config/socket.js";

import registerSocketEvents from "./sockets/socket.js";
import registerAISocket from "./sockets/ai.socket.js";
connectDB();

const PORT =
  process.env.PORT || 5000;

const server =
  http.createServer(app);

const io =
  initializeSocket(server);

registerSocketEvents(io);
registerAISocket(io);
server.listen(PORT, () => {
  console.log(
    `Server Running on ${PORT}`
  );
});