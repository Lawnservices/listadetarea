const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

let tasks = [];

// CARGAR TAREAS
async function loadTasks() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const res = await fetch("https://mlaguna.pythonanywhere.com/api/tasks/load", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token })
  });

  const data = await res.json();

  if (!data.ok) {
    alert(data.error);
    window.location.href = "login.html";
    return;
  }

  tasks = data.tasks;
  renderTasks();
}

// GUARDAR TAREAS
async function saveTasks() {
  const token = localStorage.getItem("token");

  await fetch("https://mlaguna.pythonanywhere.com/api/tasks/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, tasks })
  });
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    const span = document.createElement('span');
    span.textContent = task.text;
    span.onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    };

    const del = document.createElement('button');
    del.textContent = "Eliminar";
    del.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(span);
    li.appendChild(del);
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = '';
}

// Cargar tareas al abrir la página
loadTasks();

