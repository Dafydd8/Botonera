// src/pages/Player.jsx
import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function Player() {
  const [name, setName] = useState("");
  const [registered, setRegistered] = useState(false);
  const [roundOpen, setRoundOpen] = useState(false);
  const [winner, setWinner] = useState(null);
  const [hasBuzzed, setHasBuzzed] = useState(false);

  useEffect(() => {
    socket.on("game:state", ({ roundOpen, winner }) => {
      setRoundOpen(roundOpen);
      setWinner(winner);
      if (!winner) {
        setHasBuzzed(false); // nueva ronda -> puede volver a tocar
      }
    });

    socket.on("game:winner", (w) => {
      setWinner(w);
    });

    return () => {
      socket.off("game:state");
      socket.off("game:winner");
    };
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    socket.emit("player:register", name);
    setRegistered(true);
  };

  const handleTap = () => {
    if (!registered) return;
    if (!roundOpen) return;
    if (winner) return;
    if (hasBuzzed) return;

    setHasBuzzed(true);
    socket.emit("player:buzz");
  };

  let statusText = "";
  if (!registered) {
    statusText = "Ingresá tu nombre para unirte al juego.";
  } else if (!roundOpen) {
    statusText = "Esperando a que abran la ronda...";
  } else if (winner) {
    if (winner.name === name) {
      statusText = "¡Fuiste el primero!";
    } else {
      statusText = `Llegaste tarde, ya respondió: ${winner.name}`;
    }
  } else {
    statusText = "¡Tocá la pantalla para responder!";
  }

  if (!registered) {
    return (
      <div className="full-screen center">
        <div className="card">
          <h2>Unirte al juego</h2>
          <form onSubmit={handleRegister} className="form-col">
            <input
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    );
  }

  // Pantalla completa: cualquier click cuenta como buzz
  return (
    <div className="full-screen player-screen" onClick={handleTap}>
      <div className="player-content">
        <h2>{name}</h2>
        <p className="status-text">{statusText}</p>
        <div className="tap-hint">Tocá en cualquier lado</div>
      </div>
    </div>
  );
}
