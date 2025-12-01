// backend/server.js
const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");


const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 👉 AGREGADO: servir frontend build
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});


// Estado del juego (en memoria)
let roundOpen = false;
let winner = null; // { id, name, ts }
const players = new Map(); // socket.id -> name

io.on("connection", (socket) => {
  console.log("Nuevo socket:", socket.id);

  // jugador se registra con un nombre
  socket.on("player:register", (name) => {
    const cleanName = (name || "").trim() || `Jugador-${socket.id.slice(0, 4)}`;
    players.set(socket.id, cleanName);
    console.log(`Player registrado: ${cleanName}`);

    // le mando el estado actual
    socket.emit("game:state", { roundOpen, winner });
  });

  // jugador toca la pantalla
  socket.on("player:buzz", () => {
    if (!roundOpen) return;   // si la ronda no está abierta, ignoro
    if (winner) return;       // ya hay ganador

    const name = players.get(socket.id) || `Jugador-${socket.id.slice(0, 4)}`;
    winner = {
      id: socket.id,
      name,
      ts: Date.now(),
    };

    console.log(`BUZZ de ${name}`);

    // informo a todos quién fue
    io.emit("game:winner", winner);
    // opcional: mantener roundOpen=true, pero ya hay winner
    io.emit("game:state", { roundOpen, winner });
  });

  // admin abre una nueva ronda
  socket.on("admin:openRound", () => {
    console.log("Admin abrió nueva ronda");
    roundOpen = true;
    winner = null;
    io.emit("game:state", { roundOpen, winner });
  });

  // admin cierra / resetea ronda
  socket.on("admin:reset", () => {
    console.log("Admin reseteó / cerró ronda");
    roundOpen = false;
    winner = null;
    io.emit("game:state", { roundOpen, winner });
  });

  socket.on("disconnect", () => {
    players.delete(socket.id);
    console.log("Socket desconectado:", socket.id);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
