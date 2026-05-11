import { setState, getRoom } from "../stores/room.js";

export const queueAddCommand = ({ userId, songIds }) => {
  const roomId = `room:${userId}`;

  const room = getRoom(roomId);

  const currentSongIds = room.state.queue.songIds;

  const nextSongIds = [
    ...currentSongIds,
    ...songIds
  ];

  const state = setState(roomId, {
    queue: {
      songIds: nextSongIds
    }
  });

  return { roomId, state };
};