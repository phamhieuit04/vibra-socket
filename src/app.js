import express from "express";
import http from "http";
import { registerGateway } from "./events/gateway.js";

export const createApp = () => {
  const app = express();
  const server = http.createServer(app);

  registerGateway(server);

  return server;
};