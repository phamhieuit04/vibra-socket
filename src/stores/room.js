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
          startedAt: null
        },
        queue: {
          currentIndex: -1,
          songIds: []
        }
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
    queue
  };

  return room.state;
};

export const countClients = (io, roomId) => {
  const room = io.sockets.adapter.rooms.get(roomId);
  return room ? room.size : 0;
};