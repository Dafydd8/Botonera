// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Player from "./pages/Player";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/player" element={<Player />} />
    </Routes>
  );
}
