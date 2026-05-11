import { getRoom, setState } from "../stores/room.js";

const pickRandomIndex = (size, currentIndex) => {
  if (size <= 1) return currentIndex >= 0 ? currentIndex : 0;

  let nextIndex = currentIndex;
  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * size);
  }

  return nextIndex;
};

export const nextCommand = ({ userId }) => {
  const roomId = `room:${userId}`;
  const room = getRoom(roomId);

  const queueSize = room.state.queue.songIds.length;
  if (queueSize === 0) return null;

  const repeatMode = room.state.player.repeatMode;
  const isShuffleEnabled = room.state.player.isShuffleEnabled;

  const currentIndex =
    room.state.queue.currentIndex >= 0 &&
    room.state.queue.currentIndex < queueSize
      ? room.state.queue.currentIndex
      : 0;

  let nextIndex = currentIndex;

  if (repeatMode === "ONE") {
    nextIndex = currentIndex;
  } else if (isShuffleEnabled) {
    nextIndex = pickRandomIndex(queueSize, currentIndex);
  } else {
    nextIndex = currentIndex + 1;
    if (nextIndex >= queueSize) {
      nextIndex = repeatMode === "ALL" ? 0 : currentIndex;
    }
  }

  const state = setState(roomId, {
    player: {
      isPlaying: true,
      currentPosition: 0
    },
    queue: {
      currentIndex: nextIndex
    }
  });

  return { roomId, state };
};
