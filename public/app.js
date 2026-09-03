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

  try {
    const res = await fetch("https://www.creantunegocio.com/api/tasks/load", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });

    const data = await res.json();

    if (!data.ok) {
      alert(data.error || "Error cargando tareas");
      window.location.href = "login.html";
      return;
    }

    tasks = data.tasks || [];
    renderTasks();

  } catch (error) {
    console.error("Error loadTasks:", error);
    alert("Error de conexión");
  }
}

// GUARDAR TAREAS (con protección básica)
async function saveTasks() {
  const token = localStorage.getItem("token");

  if (!token) return;

  try {
    await fetch("https://www.creantunegocio.com/api/tasks/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, tasks })
    });
  } catch (error) {
    console.error("Error saveTasks:", error);
  }
}
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    // TEXTO DE LA TAREA
    const span = document.createElement('span');
    span.textContent = task.text;

    span.onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    };

    // BOTÓN EDITAR
    const edita = document.createElement('button');
    edita.textContent = "Editar";

    edita.onclick = () => {

      // Crear campo para editar
      const input = document.createElement('input');

      input.type = 'text';
      input.value = task.text;
      input.className = 'edit-task-input';

      // Botón Guardar
      const guardar = document.createElement('button');
      guardar.textContent = "Guardar";

      // Botón Cancelar
      const cancelar = document.createElement('button');
      cancelar.textContent = "Cancelar";

      // Limpiar la tarea actual
      li.innerHTML = '';

      li.appendChild(input);
      li.appendChild(guardar);
      li.appendChild(cancelar);

      input.focus();

      // GUARDAR CAMBIOS
      guardar.onclick = () => {
        const nuevoTexto = input.value.trim();

        if (!nuevoTexto) {
          alert("La tarea no puede estar vacía.");
          input.focus();
          return;
        }

        task.text = nuevoTexto;

        saveTasks();
        renderTasks();
      };

      // CANCELAR
      cancelar.onclick = () => {
        renderTasks();
      };

      // También guardar presionando Enter
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          guardar.click();
        }

        if (event.key === 'Escape') {
          cancelar.click();
        }
      });
    };

    // BOTÓN ELIMINAR
    const del = document.createElement('button');
    del.textContent = "Eliminar";

    del.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(span);
    li.appendChild(edita);
    li.appendChild(del);

    taskList.appendChild(li);
  });
}

// ariva nuevo
function addTask() {
  const text = taskInput.value.trim();

  if (!text) return;

  tasks.push({ text, completed: false });

  taskInput.value = '';

  renderTasks();
  saveTasks();
}

// Cargar tareas al abrir la página
loadTasks();


//instalar detectar 
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // aquí puedes mostrar tu botón
  const btn = document.getElementById("installBtn");
  if (btn) btn.style.display = "block";
});

document.getElementById("installBtn").addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();

  const choice = await deferredPrompt.userChoice;

  if (choice.outcome === "accepted") {
    console.log("App instalada");
  }

  deferredPrompt = null;
});