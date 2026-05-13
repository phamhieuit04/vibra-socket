import { getRoom, setState } from "../stores/room.js";
import { pickRandomIndex, getValidatedCurrentIndex } from "../helpers/util.js";

export const previousCommand = ({ userId }) => {
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

  let previousIndex = currentIndex;

  if (isShuffleEnabled) {
    previousIndex = pickRandomIndex(queueSize, currentIndex);
  } else {
    previousIndex = currentIndex - 1;

    if (previousIndex < 0) {
      if (repeatMode === "ALL") {
        previousIndex = queueSize - 1;
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
      currentIndex: previousIndex
    }
  });

  return { roomId, state };
};