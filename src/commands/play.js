import { setState } from "../store/room.js";

export const play = ({ userId }) => {
  const roomId = `user:${userId}`;

  const state = setState(roomId, {
    isPlaying: true
  });

  return { roomId, state };
};