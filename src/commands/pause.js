import { getRoom, setState } from "../stores/room.js";

export const pauseCommand = ({ userId }) => {
  const roomId = `room:${userId}`;
  const room = getRoom(roomId);

  const elapsed = Date.now() - room.state.timestamp;
  const current = room.state.player.isPlaying
    ? room.state.player.currentPosition + elapsed
    : room.state.player.currentPosition;

  const state = setState(roomId, {
    player: {
      isPlaying: false,
      currentPosition: current
    }
  });

  return { roomId, state };
};