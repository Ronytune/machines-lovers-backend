const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Servir arquivos estáticos (como HTML, CSS, JS) da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Configurar o Socket.io para comunicação em tempo real
io.on("connection", (socket) => {
  console.log("Um usuário conectou:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`Usuário ${userId} entrou na sala`);
  });

  socket.on("chat message", ({ from, to, message }) => {
    io.to(to).emit("chat message", { from, message });
  });

  socket.on("disconnect", () => {
    console.log("Um usuário saiu:", socket.id);
  });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
