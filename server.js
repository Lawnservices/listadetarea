const express = require('express');
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

// Permite recibir JSON desde tu frontend
app.use(express.json());

// Sirve tu carpeta public (HTML, CSS, JS)
app.use(express.static('public'));

app.use((req, res, next) => {
  const file = path.join(__dirname, "public", req.path + ".html");
  if (fs.existsSync(file)) {
    res.sendFile(file);
  } else {
    next();
  }
});


// ruta limpia
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public/login.html"));
});

// otra página ejemplo
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public/register.html"));
});
// otra pagina wed
app.get("/tareas", (req, res) => {
  res.sendFile(path.join(__dirname, "public/tareas.html"));
});
// Servidor funcionando
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// ERROR 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});