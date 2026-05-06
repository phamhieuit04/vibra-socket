import { getRoom, setState } from "../store/room.js";

export const pause = ({ userId }) => {
  const roomId = `user:${userId}`;
  const room = getRoom(roomId);

  const current =
    room.state.positionMs +
    (Date.now() - room.state.timestamp);

  const state = setState(roomId, {
    isPlaying: false,
    positionMs: current
  });

  return { roomId, state };
};