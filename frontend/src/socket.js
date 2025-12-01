// src/socket.js
import { io } from "socket.io-client";

// Como frontend y backend van a vivir en el MISMO host/puerto,
// alcanza con llamar io() sin argumentos.
export const socket = io({
  transports: ["websocket"],
  autoConnect: true,
});
