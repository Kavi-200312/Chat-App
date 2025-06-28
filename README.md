# 💬 Real-Time Chat App (MERN + Socket.IO)

A real-time full-stack chat application built using the **MERN stack** and **Socket.IO**. This project supports real-time messaging, authentication, and modern UI components.

---

## 🚀 Features

- 🔐 User authentication and registration (JWT-based)
- 💬 One-to-one real-time messaging using **Socket.IO**
- 🧑‍🤝‍🧑 Online users presence tracking
- 📬 Message read/unread indicators
- 🌙 Dark mode friendly interface
- 📱 Responsive and mobile-friendly layout
- ⚙️ Zustand for global state management
- 🧼 Clean UI with Tailwind CSS + DaisyUI

---

## 🧰 Tech Stack

### 🔷 Frontend
- React.js
- Tailwind CSS + DaisyUI
- Zustand (for state management)
- Axios
- Socket.IO Client

### 🔶 Backend
- Node.js + Express.js
- MongoDB with Mongoose
- Socket.IO
- JSON Web Tokens (JWT)
- bcrypt for password hashing

---

## 🖼️ Live Demo

🔗 [Live App on Render](https://chatty-app-kavi-1312.onrender.com/)

---

## 📦 Getting Started

### 🔧 Clone the repository

```bash
git clone https://github.com/Kavi-200312/Chat-App.git
cd Chat-App
```

### 💻 Install dependencies

```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### 🚀 Start the development servers

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm start
```

---

## 🔐 .env Example (Backend)

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

---

## 📂 Folder Structure

```
/client
  /src
    /store       ← Zustand store
    /components  ← Chat UI components
    /pages       ← Login/Register/Chat screens

/server
  /controllers
  /models
  /routes
  /config
  server.js
  socket.js
```

---

## 👨‍💻 Author

**Kaviyarasu M**  
Full Stack Developer | MERN | Zustand | Socket.IO  
[GitHub](https://github.com/Kavi-200312) • [Live App](https://chatty-app-kavi-1312.onrender.com)

---

## 📜 License

This project is open-source under the [MIT License](LICENSE).
