import { playCommand } from "../commands/play.js";
import { pauseCommand } from "../commands/pause.js";
import { seekCommand } from "../commands/seek.js";

export const registerHandler = (io, socket) => {
  socket.on("join", ({ userId }) => {
    const roomId = `user:${userId}`;
    socket.join(roomId);
  });

  socket.on("play", (payload) => {
    if (!payload?.userId) return;

    const { roomId, state } = playCommand(payload);
    io.to(roomId).emit("state", state);
  });

  socket.on("pause", (payload) => {
    if (!payload?.userId) return;

    const { roomId, state } = pauseCommand(payload);
    io.to(roomId).emit("state", state);
  });

  socket.on("seek", (payload) => {
    const { userId, positionMs } = payload || {};

    if (!userId || typeof positionMs !== "number") return;

    const { roomId, state } = seekCommand(payload);
    io.to(roomId).emit("state", state);
  });
};