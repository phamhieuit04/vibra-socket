import { getRoom, setState } from "../stores/room.js";

export const seekCommand = ({ userId, positionMs }) => {
  const roomId = `room:${userId}`;
  const room = getRoom(roomId);

  const startedAt = room.state.player.isPlaying
    ? Date.now()
    : room.state.player.startedAt;

  const state = setState(roomId, {
    player: {
      currentPosition: positionMs,
      startedAt
    }
  });

  return { roomId, state };
};