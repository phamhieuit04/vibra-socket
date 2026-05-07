const rooms = {};

export const getRoom = (roomId) => {
  if (!rooms[roomId]) {
    rooms[roomId] = {
      state: {
        player: {
          isPlaying: false,
          isShuffleEnabled: false,
          repeatMode: "OFF",

          currentPosition: 0,
        },
        queue: {
          currentIndex: -1,
          songIds: []
        },
        timestamp: Date.now()
      }
    };
  }
  return rooms[roomId];
};

export const setState = (roomId, partial) => {
  const room = getRoom(roomId);
  const player = partial.player
    ? { ...room.state.player, ...partial.player }
    : room.state.player;
  const queue = partial.queue
    ? { ...room.state.queue, ...partial.queue }
    : room.state.queue;

  room.state = {
    ...room.state,
    ...partial,
    player,
    queue,
    timestamp: Date.now()
  };

  return room.state;
};

export const countClients = (io, roomId) => {
  const room = io.sockets.adapter.rooms.get(roomId);
  return room ? room.size : 0;
};