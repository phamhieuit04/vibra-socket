import express from "express";
import http from "http";
import { registerSocket } from "./events/socket.js";
import { registerHandler } from "./events/handler.js";
import { getRoom } from "./stores/room.js";

export const createApp = () => {
  const app = express();
  const server = http.createServer(app);

  const io = registerSocket(server);
  io.on("connection", (socket) => {
      registerHandler(io, socket);
  });

  app.get("/api/rooms/:userId", (req, res) => {
    const { userId } = req.params;
    const roomId = `room:${userId}`;
    const room = getRoom(roomId);
    res.json({ roomId, state: room.state });
  });

  return server;
};