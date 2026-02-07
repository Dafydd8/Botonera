# Botonera Trivia Web

App web para jugar trivia en tiempo real usando el celular como **botonera**.

Los jugadores entran desde su dispositivo, presionan para responder, y el sistema registra automáticamente quién tocó primero.

---

## 🧠 Cómo funciona

* Un usuario crea o administra la partida
* Los jugadores se unen desde sus dispositivos
* El admin abre la ronda
* Todos pueden hacer buzz
* El backend registra **el primer toque**
* Se muestra quién ganó el turno

---

## 🏗 Arquitectura

La app está separada en dos servicios:

| Parte    | Plataforma | Función         |
| -------- | ---------- | --------------- |
| Frontend | Vercel     | UI React        |
| Backend  | Render     | API + Socket.IO |

Comunicación:

```
React (browser)
      ↓ WebSocket
Render Backend (Node + Socket.IO)
```

No se sirve frontend desde backend.

---

## 🔧 Tecnologías

* Node.js
* Express
* Socket.IO
* React
* Vite
* Render (hosting backend)
* Vercel (hosting frontend)

---

## 📦 Requisitos para desarrollo local

* Node.js 18+
* npm

---

## 🚀 Instalación (modo local)

### Clonar repo

```
git clone <REPO_URL>
cd <CARPETA>
```

---

### Frontend

```
cd frontend
npm install
npm run dev
```

Abre en:

```
http://localhost:5173
```

---

### Backend

En otra terminal:

```
cd backend
npm install
npm run dev
```

Corre en:

```
http://localhost:4000
```

---

## 🔌 Variables de entorno

### Frontend (.env)

```
VITE_BACKEND_URL=http://localhost:4000
```

En producción se reemplaza por URL de Render.

---

### Backend (Render env vars)

```
FRONTEND_URL=https://TU-APP.vercel.app
```

Usado para CORS.

---

## 🌍 Deploy

### Backend → Render

* Crear Web Service
* Root directory: `backend`
* Build command:

```
npm install
```

* Start command:

```
npm start
```

El servidor usa:

```
process.env.PORT
```

---

### Frontend → Vercel

* Importar repo
* Root directory: `frontend`
* Framework: Vite
* Agregar env var:

```
VITE_BACKEND_URL=https://TU-BACK.onrender.com
```

Deploy.

---

## 📂 Estructura del proyecto

```
backend/
  server.js
  package.json

frontend/
  src/
  index.html
  package.json
```

---

## ⚠️ Limitaciones actuales

* Sin base de datos
* Estado en memoria
* Reiniciar backend borra partidas
* Render free puede dormirse (cold start)

---

## 🧪 Futuras mejoras

* Salas múltiples
* Persistencia Redis
* Auth admin
* Ranking
* Sonidos / animaciones buzz
* UI mobile polish

---

## ❤️ Autor

Proyecto experimental para jugar trivia con amigos y explorar realtime web apps.
