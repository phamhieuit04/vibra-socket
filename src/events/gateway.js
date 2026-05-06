import { Server } from "socket.io";
import { registerHandler } from "./handler.js";

export const registerGateway = (server) => {
  const io = new Server(server, {
      cors: {
          origin: "*",
          methods: ["GET", "POST", "PUT", "PATCH"],
          credentials: true,
      },
      transports: ["websocket", "polling", "flashsocket"],
      reconnection: false,
      handlePreflightRequest: (req, res) => {
          res.writeHead(200, {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
              "Access-Control-Allow-Headers":
              "Content-Type, Authorization, X-Requested-With",
              "Access-Control-Allow-Credentials": "true",
          });
          res.end();
      },
      path: "/socket.io",
  });

  io.on("connection", (socket) => {
      registerHandler(io, socket);
  });
 }