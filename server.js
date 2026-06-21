const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

const USERS_DIR = path.join(__dirname, 'data', 'usuarios');
const SESSIONS = {}; // tokens en memoria

app.use(express.json());
app.use(express.static('public'));

if (!fs.existsSync(USERS_DIR)) {
  fs.mkdirSync(USERS_DIR, { recursive: true });
}

function getUserFile(username) {
  return path.join(USERS_DIR, `${username}.json`);
}

function isValidUsername(username) {
  return /^[a-zA-Z0-9_-]{3,20}$/.test(username);
}

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas peticiones, intenta más tarde.'
});

app.use(apiLimiter);

// REGISTRO
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!isValidUsername(username)) {
    return res.json({ ok: false, error: "Usuario inválido" });
  }

  const file = getUserFile(username);

  if (fs.existsSync(file)) {
    return res.json({ ok: false, error: "El usuario ya existe" });
  }

  const hash = await bcrypt.hash(password, 10);

  const newUser = {
    password: hash,
    tasks: []
  };

  fs.writeFileSync(file, JSON.stringify(newUser, null, 2));

  res.json({ ok: true, message: "Usuario registrado" });
});

// LOGIN
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const file = getUserFile(username);

  if (!fs.existsSync(file)) {
    return res.json({ ok: false, error: "Usuario no encontrado" });
  }

  const data = JSON.parse(fs.readFileSync(file, 'utf8'));

  const match = await bcrypt.compare(password, data.password);
  if (!match) {
    return res.json({ ok: false, error: "Contraseña incorrecta" });
  }

  const token = crypto.randomBytes(16).toString('hex');
  SESSIONS[token] = username;

  res.json({ ok: true, token });
});

// logout
// LOGOUT
app.post('/logout', (req, res) => {
  const { token } = req.body;

  if (SESSIONS[token]) {
    delete SESSIONS[token];
  }

  res.json({ ok: true, message: "Sesión cerrada" });
});

// CARGAR TAREAS
app.post('/tasks/load', (req, res) => {
  const { token } = req.body;

  if (!SESSIONS[token]) {
    return res.json({ ok: false, error: "Sesión inválida" });
  }

  const username = SESSIONS[token];
  const file = getUserFile(username);

  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  res.json({ ok: true, tasks: data.tasks });
});

// GUARDAR TAREAS
app.post('/tasks/save', (req, res) => {
  const { token, tasks } = req.body;

  if (!SESSIONS[token]) {
    return res.json({ ok: false, error: "Sesión inválida" });
  }

  const username = SESSIONS[token];
  const file = getUserFile(username);

  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.tasks = tasks;

  fs.writeFileSync(file, JSON.stringify(data, null, 2));

  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Servidor seguro en http://localhost:${PORT}`);
});
