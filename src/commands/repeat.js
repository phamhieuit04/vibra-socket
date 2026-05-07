import { setState } from "../stores/room.js";

const REPEAT_MODES = new Set(["OFF", "ALL", "ONE"]);

export const repeatCommand = ({ userId, repeatMode }) => {
  const roomId = `room:${userId}`;
  const nextMode = REPEAT_MODES.has(repeatMode) ? repeatMode : "OFF";

  const state = setState(roomId, {
    player: {
      repeatMode: nextMode
    }
  });

  return { roomId, state };
};
