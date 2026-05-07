import express from "express";
import http from "http";
import { registerSocket } from "./events/socket.js";
import { registerHandler } from "./events/handler.js";

export const createApp = () => {
  const app = express();
  const server = http.createServer(app);

  const io = registerSocket(server);
  io.on("connection", (socket) => {
      registerHandler(io, socket);
  });

  return server;
};