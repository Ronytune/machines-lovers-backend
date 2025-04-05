const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

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

server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
