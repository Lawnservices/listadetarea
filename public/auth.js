// TOKEN GLOBAL
let token = localStorage.getItem("token") || "";

// REGISTRO
async function register() {
  const username = document.getElementById("user").value.trim();
  const password = document.getElementById("pass").value.trim();

  const res = await fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  alert(data.ok ? "Registrado" : data.error);

  if (data.ok) window.location.href = "login.html";
}

// LOGIN
async function login() {
  const username = document.getElementById("user").value.trim();
  const password = document.getElementById("pass").value.trim();

  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (!data.ok) {
    alert(data.error);
    return;
  }

  localStorage.setItem("token", data.token);
  window.location.href = "tareas.html";
}

// LOGOUT
async function logout() {
  const token = localStorage.getItem("token");

  await fetch('/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  });

  localStorage.removeItem("token");
  window.location.href = "login.html";
}
