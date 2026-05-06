import { setState } from "../store/room.js";

export const seek = ({ userId, positionMs }) => {
  const roomId = `user:${userId}`;

  const state = setState(roomId, {
    positionMs
  });

  return { roomId, state };
};