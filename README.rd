# Botonera Trivia Web

App web simple para jugar **trivia con amigos** usando el celu como botonera.

- Cada persona entra al sitio desde su dispositivo.
- Elige si quiere **abrir un juego** (admin) o **unirse a un juego** (jugador).
- El admin abre/cierra rondas.
- Los jugadores ven una pantalla que dice _“Presiona para responder”_ y al tocar en cualquier lado envían su `buzz`.
- Solo se registra **el primero** que toca; el resto ve quién llegó antes.

---

## 🔧 Tecnologías

- **Node.js + Express** → servidor HTTP
- **Socket.IO** → comunicación en tiempo real (quién apretó primero)
- **React + Vite** → frontend
- El backend sirve el **build estático** de React desde `frontend/dist`.

La app corre todo junto en **un solo puerto** (por defecto `4000`).

---

## ✅ Requisitos previos

- [Node.js](https://nodejs.org/) (versión 18+ recomendada)
- `npm` (se instala junto con Node.js)
- (Opcional) [ngrok](https://ngrok.com/) si querés compartir el juego por internet

---

## 📂 Estructura del proyecto

```text
Botonera-2/
  backend/
    package.json
    server.js
    ...
  frontend/
    package.json
    vite.config.js
    src/
      App.jsx
      main.jsx
      socket.js
      styles.css
      pages/
        Home.jsx
        Admin.jsx
        Player.jsx
    dist/   ← build de producción (se genera con `npm run build`)
