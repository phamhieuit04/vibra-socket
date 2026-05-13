import { getRoom, setState } from "../stores/room.js";
import { pickRandomIndex, getValidatedCurrentIndex } from "../helpers/util.js";

export const nextCommand = ({ userId }) => {
  const roomId = `room:${userId}`;
  const room = getRoom(roomId);

  const queueSize = room.state.queue.songIds.length;

  if (queueSize === 0) {
    const state = setState(roomId, {
      player: {
        isPlaying: false,
        currentPosition: 0,
        startedAt: null
      },
      queue: {
        currentIndex: -1
      }
    });

    return { roomId, state };
  }

  const repeatMode = room.state.player.repeatMode;
  const isShuffleEnabled = room.state.player.isShuffleEnabled;

  const currentIndex = getValidatedCurrentIndex(
    room.state.queue.currentIndex,
    queueSize
  );

  let nextIndex = currentIndex;

  if (isShuffleEnabled) {
    nextIndex = pickRandomIndex(queueSize, currentIndex);
  } else {
    nextIndex = currentIndex + 1;

    if (nextIndex >= queueSize) {
      if (repeatMode === "ALL") {
        nextIndex = 0;
      }
      else {
        const state = setState(roomId, {
          player: {
            isPlaying: false,
            currentPosition: 0,
            startedAt: null
          },
          queue: {
            currentIndex: currentIndex
          }
        });

        return { roomId, state };
      }
    }
  }

  const state = setState(roomId, {
    player: {
      isPlaying: true,
      currentPosition: 0,
      startedAt: Date.now()
    },
    queue: {
      currentIndex: nextIndex
    }
  });

  return { roomId, state };
};