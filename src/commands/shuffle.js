import { setState } from "../stores/room.js";

export const shuffleCommand = ({ userId, isShuffleEnabled }) => {
  const roomId = `room:${userId}`;

  const state = setState(roomId, {
    player: {
      isShuffleEnabled: Boolean(isShuffleEnabled)
    }
  });

  return { roomId, state };
};
