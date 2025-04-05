function criarPost() {
  const texto = document.getElementById("post-text").value;
  if (texto.trim() === "") return;

  const post = document.createElement("div");
  post.className = "post";
  post.textContent = texto;

  document.getElementById("feed").prepend(post);
  document.getElementById("post-text").value = "";
}
