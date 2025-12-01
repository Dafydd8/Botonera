// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="full-screen center">
      <div className="card">
        <h1>Botonera Trivia</h1>
        <p>¿Qué haces hoy?:</p>
        <div className="buttons-col">
          <button onClick={() => navigate("/admin")}>Abrir juego</button>
          <button onClick={() => navigate("/player")}>Unirte a juego</button>
        </div>
      </div>
    </div>
  );
}
