import { playCommand } from "../commands/play.js";
import { pauseCommand } from "../commands/pause.js";
import { seekCommand } from "../commands/seek.js";
import { shuffleCommand } from "../commands/shuffle.js";
import { repeatCommand } from "../commands/repeat.js";
import { queueAddCommand, queueRemoveCommand } from "../commands/queue.js";
import { nextCommand } from "../commands/next.js";
import { previousCommand } from "../commands/previous.js";
import { trackEndedCommand } from "../commands/trackEnded.js";
import { joinCommand } from "../commands/join.js";
import { countClients } from "../stores/room.js";

export const registerHandler = (io, socket) => {
  socket.on("join", ({ userId }) => {
    if (userId) {
      const { state } = joinCommand({ userId });
      socket.emit("state", state);
    }

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

  socket.on("queue:add", (payload) => {
    const { userId, songIds } = payload || {};

    if (!userId) return;
    if (!Array.isArray(songIds)) return;

    const { roomId, state } = queueAddCommand({
      userId,
      songIds
    });

    io.to(roomId).emit("state", state);
  });

  socket.on("queue:remove", (payload) => {
    const {userId, songIds} = payload || {};

    if (!userId) return;
    if (!Array.isArray(songIds)) return;

    const {roomId, state} = queueRemoveCommand({
      userId,
      songIds
    });

    io.to(roomId).emit("state", state);
  })

  socket.on("next", (payload) => {
    const { userId } = payload || {};

    if (!userId) return;

    const result = nextCommand({ userId });
    if (!result) return;

    const { roomId, state } = result;
    io.to(roomId).emit("state", state);
  });

  socket.on("previous", (payload) => {
    const { userId } = payload || {};

    if (!userId) return;

    const result = previousCommand({ userId });
    if (!result) return;

    const { roomId, state } = result;
    io.to(roomId).emit("state", state);
  });

  socket.on("trackEnded", (payload) => {
    const { userId } = payload || {};

    if (!userId) return;

    const result = trackEndedCommand({ userId });
    if (!result) return;

    const { roomId, state } = result;
    io.to(roomId).emit("state", state);
  });
};