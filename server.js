const express = require('express');
const path = require("path");
const app = express();
const PORT = 3000;

// Permite recibir JSON desde tu frontend
app.use(express.json());

// Sirve tu carpeta public (HTML, CSS, JS)
app.use(express.static('public'));



// ruta limpia
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public/login.html"));
});

// otra página ejemplo
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public/register.html"));
});
// Servidor funcionando
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
