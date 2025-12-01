// src/pages/Admin.jsx
import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function Admin() {
  const [roundOpen, setRoundOpen] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    socket.on("game:state", ({ roundOpen, winner }) => {
      setRoundOpen(roundOpen);
      setWinner(winner);
    });

    socket.on("game:winner", (w) => {
      setWinner(w);
    });

    return () => {
      socket.off("game:state");
      socket.off("game:winner");
    };
  }, []);

  const handleOpen = () => {
    socket.emit("admin:openRound");
  };

  const handleReset = () => {
    socket.emit("admin:reset");
  };

  return (
    <div className="full-screen center">
      <div className="card admin-card">
        <h1>Panel Admin</h1>

        <div className="buttons-row">
          <button className="green" onClick={handleOpen}>
            Nueva ronda
          </button>
          <button className="red" onClick={handleReset}>
            Cerrar / Reset
          </button>
        </div>

        <p className="status-label">
          Estado:{" "}
          <strong style={{ color: roundOpen ? "#4caf50" : "#f44336" }}>
            {roundOpen ? "Ronda ABIERTA" : "Ronda CERRADA"}
          </strong>
        </p>

        <div className="winner-box">
          {winner ? (
            <>
              <span>Primero en responder:</span>
              <h2>{winner.name}</h2>
            </>
          ) : (
            <span>Nadie respondió todavía</span>
          )}
        </div>
      </div>
    </div>
  );
}
