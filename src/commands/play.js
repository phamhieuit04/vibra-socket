import { setState } from "../stores/room.js";

export const playCommand = ({ userId }) => {
  const roomId = `user:${userId}`;

  const state = setState(roomId, {
    isPlaying: true
  });

  return { roomId, state };
};