import { setState } from "../stores/room.js";

export const queueCommand = ({ userId, songIds, currentIndex }) => {
  const roomId = `room:${userId}`;

  const queue = {};
  if (Array.isArray(songIds)) {
    queue.songIds = songIds;
  }
  if (typeof currentIndex === "number") {
    queue.currentIndex = currentIndex;
  }

  const state = setState(roomId, {
    queue
  });

  return { roomId, state };
};
