import { setState } from "../stores/room.js";

export const seekCommand = ({ userId, positionMs }) => {
  const roomId = `user:${userId}`;

  const state = setState(roomId, {
    positionMs
  });

  return { roomId, state };
};