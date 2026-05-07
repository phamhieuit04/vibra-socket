import { playCommand } from "../commands/play.js";
import { pauseCommand } from "../commands/pause.js";
import { seekCommand } from "../commands/seek.js";
import { shuffleCommand } from "../commands/shuffle.js";
import { repeatCommand } from "../commands/repeat.js";
import { queueCommand } from "../commands/queue.js";
import { countClients } from "../stores/room.js";

export const registerHandler = (io, socket) => {
  socket.on("join", ({ userId }) => {
    const roomId = `room:${userId}`;
    socket.join(roomId);

    console.log(``);
    console.log(`Joined ${roomId}`);
    console.log(`Total clients: ${countClients(io, roomId)}`);
  });

  socket.on("play", (payload) => {
    if (!payload?.userId) return;

    const result = playCommand(payload);
    if (!result) return;

    const { roomId, state } = result;
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

  socket.on("shuffle", (payload) => {
    const { userId, isShuffleEnabled } = payload || {};

    if (!userId) return;

    const { roomId, state } = shuffleCommand({ userId, isShuffleEnabled });
    io.to(roomId).emit("state", state);
  });

  socket.on("repeat", (payload) => {
    const { userId, repeatMode } = payload || {};

    if (!userId) return;

    const { roomId, state } = repeatCommand({ userId, repeatMode });
    io.to(roomId).emit("state", state);
  });

  socket.on("queue", (payload) => {
    const { userId, songIds, currentIndex } = payload || {};

    if (!userId) return;

    const { roomId, state } = queueCommand({
      userId,
      songIds,
      currentIndex
    });
    io.to(roomId).emit("state", state);
  });
};