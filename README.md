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
- **Socket.IO** → comunicación en tiempo real  
- **React + Vite** → frontend  
- El backend sirve el **build estático** de React desde `frontend/dist`.

---

## 📦 Requisitos

- Node.js 18+
- npm
- (Opcional) ngrok para compartir el juego globalmente

---

## 🚀 Instalación

### 1. Clonar

```bash
git clone <URL-DEL-REPO>
cd <carpeta>
```

### 2. Frontend

```bash
cd frontend
npm install
npm run build   # genera frontend/dist
```

### 3. Backend

```bash
cd ../backend
npm install
npm run dev
```

La app se abre en:

```
http://localhost:4000
```

---

## 📡 Jugar en LAN (misma WiFi)

Buscar tu IP local:

```
ipconfig
```

Tus amigos entran a:

```
http://TU-IP-LOCAL:4000
```

---

## 🌍 Compartir por internet usando ngrok

Con el backend corriendo:

```bash
ngrok http 4000
```

ngrok te dará una URL:

```
https://algo.ngrok-free.app
```

Esa URL es pública: todos pueden entrar y jugar.

---

## 🧪 Scripts

### Frontend

```
npm run dev
npm run build
```

### Backend

```
npm run dev
```

---

## 📂 Estructura

```
backend/
  server.js
  package.json

frontend/
  src/
  dist/
  package.json
```

---

## 📝 Notas

- No usa base de datos.
- Estado en memoria.
- Ideal para juntadas, trivias y juegos rápidos.
