import { getRoom, setState } from "../stores/room.js";

export const playCommand = ({ userId, songId }) => {
  const roomId = `room:${userId}`;
  const room = getRoom(roomId);

  const hasSongId =
    typeof songId === "number" &&
    !Number.isNaN(songId);

  const queueSize = room.state.queue.songIds.length;
  const currentIndex = room.state.queue.currentIndex;

  const isCurrentValid =
    currentIndex >= 0 &&
    currentIndex < queueSize;

  if (!hasSongId && !isCurrentValid) {
    return null;
  }

  let nextQueue = room.state.queue;

  let nextPosition =
    room.state.player.currentPosition;

  if (hasSongId) {
    const index =
      room.state.queue.songIds.indexOf(songId);

    if (index >= 0) {
      nextQueue = {
        ...room.state.queue,
        currentIndex: index
      };

      if (index !== currentIndex) {
        nextPosition = 0;
      }
    } else {
      const songIds = [
        ...room.state.queue.songIds,
        songId
      ];

      nextQueue = {
        currentIndex: songIds.length - 1,
        songIds
      };

      nextPosition = 0;
    }
  }

  const state = setState(roomId, {
    player: {
      isPlaying: true,
      currentPosition: nextPosition,

      startedAt: Date.now()
    },

    queue: nextQueue
  });

  return { roomId, state };
};