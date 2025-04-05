const socket = io("http://localhost:3000"); // Substitua pelo URL do seu servidor online

const userId = prompt("Digite seu nome ou ID:");
socket.emit("join", userId);

function enviarMensagem() {
  const input = document.getElementById("chat-input");
  const msg = input.value.trim();
  if (!msg) return;

  const chatBox = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.textContent = `Você: ${msg}`;
  chatBox.appendChild(div);

  input.value = "";

  // Enviar mensagem para o servidor
  socket.emit("chat message", {
    from: userId,
    to: "todos", // Enviar para todos os usuários conectados
    message: msg
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

socket.on("chat message", ({ from, message }) => {
  const chatBox = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.textContent = `${from}: ${message}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});
