import { getRoom } from "../stores/room.js";

export const joinCommand = ({ userId }) => {
	const roomId = `room:${userId}`;
	const room = getRoom(roomId);

	return { roomId, state: room.state };
};