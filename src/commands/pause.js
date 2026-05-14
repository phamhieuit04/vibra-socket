import { getRoom, setState } from "../stores/room.js";

export const pauseCommand = ({ userId, positionMs }) => {
  const roomId = `room:${userId}`;
  const room = getRoom(roomId);

  let current;

  if (typeof positionMs === "number" && !Number.isNaN(positionMs) && positionMs >= 0) {
    current = positionMs;
  } else {
    current = room.state.player.currentPosition;

    if (
      room.state.player.isPlaying &&
      room.state.player.startedAt
    ) {
      current +=
        Date.now() -
        room.state.player.startedAt;
    }
  }

  const state = setState(roomId, {
    player: {
      isPlaying: false,
      currentPosition: current,
      startedAt: null
    }
  });

  return { roomId, state };
};