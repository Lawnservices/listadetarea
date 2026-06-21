const API = "https://TU-BACKEND.onrender.com"; // cambia esto

async function login() {
  const username = document.getElementById("user").value;
  const password = document.getElementById("pass").value;

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "tareas.html";
  } else {
    alert(data.error);
  }
}

async function addTask() {
  const task = document.getElementById("task").value;
  const token = localStorage.getItem("token");

  await fetch(`${API}/tasks/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
      tasks: [task]
    })
  });

  alert("Guardado");
}