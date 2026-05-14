import { setState, getRoom } from "../stores/room.js";

export const queueAddCommand = ({ userId, songIds }) => {
  const roomId = `room:${userId}`;

  const room = getRoom(roomId);

  const currentSongIds = room.state.queue.songIds;

  const uniqueNewSongIds = songIds.filter(
    (id) => !currentSongIds.includes(id)
  );

  const nextSongIds = [
    ...currentSongIds,
    ...uniqueNewSongIds
  ];

  const state = setState(roomId, {
    queue: {
      songIds: nextSongIds
    }
  });

  return { roomId, state };
};

export const queueRemoveCommand = ({ userId, songIds }) => {
  const roomId = `room:${userId}`;

  const room = getRoom(roomId);

  const currentSongIds = room.state.queue.songIds;
  const currentIndex = room.state.queue.currentIndex;

  const currentSongId = currentSongIds[currentIndex];

  const nextSongIds = currentSongIds.filter(
    (id) => !songIds.includes(id)
  );

  let nextIndex = currentIndex;

  if (nextSongIds.length === 0) {
    nextIndex = -1;
  }
  else if (songIds.includes(currentSongId)) {
    if (nextIndex >= nextSongIds.length) {
      nextIndex = nextSongIds.length - 1;
    }
  }
  else {
    const removedBeforeCurrent = currentSongIds
      .slice(0, currentIndex)
      .filter((id) => songIds.includes(id)).length;

    nextIndex = currentIndex - removedBeforeCurrent;
  }

  const state = setState(roomId, {
    queue: {
      songIds: nextSongIds,
      currentIndex: nextIndex
    }
  });

  return { roomId, state };
};