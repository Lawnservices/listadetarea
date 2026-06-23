const express = require('express');
const app = express();
const PORT = 3000;

// Permite recibir JSON desde tu frontend
app.use(express.json());

// Sirve tu carpeta public (HTML, CSS, JS)
app.use(express.static('public'));

// Servidor funcionando
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
