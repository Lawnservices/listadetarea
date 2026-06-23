// TOKEN GLOBAL
let token = localStorage.getItem("token") || "";

// REGISTRO (solo usuario + contraseña)
async function register() {
  const username = document.getElementById("user").value.trim();
  const password = document.getElementById("pass").value.trim();

  const res = await fetch("https://mlaguna.pythonanywhere.com/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (!data.ok) {
    alert(data.error || "Error al registrar");
    return;
  }

  alert("Registrado correctamente");
  window.location.href = "login.html";
}

// LOGIN (solo usuario + contraseña)
async function login() {
  const username = document.getElementById("user").value.trim();
  const password = document.getElementById("pass").value.trim();

  const res = await fetch("https://mlaguna.pythonanywhere.com/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (!data.ok) {
    alert(data.error || "Error al iniciar sesión");
    return;
  }

  localStorage.setItem("token", data.token);
  window.location.href = "tareas.html";
}

// LOGOUT (solo borra token)
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
