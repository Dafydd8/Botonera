import { io } from "socket.io-client";

export const socket = io("https://botonera-9fvm.onrender.com/", {
  transports: ["websocket"],
});
