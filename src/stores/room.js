const rooms = {};

export const getRoom = (roomId) => {
  if (!rooms[roomId]) {
    rooms[roomId] = {
      state: {
        isPlaying: false,
        positionMs: 0,
        timestamp: Date.now()
      }
    };
  }
  return rooms[roomId];
};

export const setState = (roomId, partial) => {
  const room = getRoom(roomId);

  room.state = {
    ...room.state,
    ...partial,
    timestamp: Date.now()
  };

  return room.state;
};