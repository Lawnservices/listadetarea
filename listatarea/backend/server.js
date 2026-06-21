const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 📁 carpeta usuarios
const USERS_DIR = path.join(__dirname, 'data', 'usuarios');

// 🔐 sesiones en memoria (temporal)
const SESSIONS = {};

// ====== MIDDLEWARE ======
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 🔥 rate limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(apiLimiter);

// ====== HELPERS ======
function getUserFile(username) {
  return path.join(USERS_DIR, `${username}.json`);
}

function isValidUsername(username) {
  return /^[a-zA-Z0-9_-]{3,20}$/.test(username);
}

// 📁 crear carpeta si no existe
if (!fs.existsSync(USERS_DIR)) {
  fs.mkdirSync(USERS_DIR, { recursive: true });
}

// ====== ROUTE TEST ======
app.get("/", (req, res) => {
  res.json({ ok: true, message: "API funcionando correctamente 🚀" });
});

// ====== REGISTER ======
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ ok: false, error: "Faltan datos" });
  }

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

  res.json({ ok: true, message: "Usuario creado" });
});

// ====== LOGIN ======
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const file = getUserFile(username);

  if (!fs.existsSync(file)) {
    return res.json({ ok: false, error: "Usuario no existe" });
  }

  const data = JSON.parse(fs.readFileSync(file, "utf8"));

  const match = await bcrypt.compare(password, data.password);

  if (!match) {
    return res.json({ ok: false, error: "Contraseña incorrecta" });
  }

  const token = crypto.randomBytes(24).toString('hex');

  SESSIONS[token] = {
    username,
    created: Date.now()
  };

  res.json({ ok: true, token });
});

// ====== LOGOUT ======
app.post('/logout', (req, res) => {
  const { token } = req.body;

  if (token) {
    delete SESSIONS[token];
  }

  res.json({ ok: true, message: "Sesión cerrada" });
});

// ====== LOAD TASKS ======
app.post('/tasks/load', (req, res) => {
  const { token } = req.body;

  const session = SESSIONS[token];

  if (!session) {
    return res.json({ ok: false, error: "Sesión inválida" });
  }

  const file = getUserFile(session.username);

  const data = JSON.parse(fs.readFileSync(file, "utf8"));

  res.json({ ok: true, tasks: data.tasks || [] });
});

// ====== SAVE TASKS ======
app.post('/tasks/save', (req, res) => {
  const { token, tasks } = req.body;

  const session = SESSIONS[token];

  if (!session) {
    return res.json({ ok: false, error: "Sesión inválida" });
  }

  const file = getUserFile(session.username);

  const data = JSON.parse(fs.readFileSync(file, "utf8"));

  data.tasks = tasks || [];

  fs.writeFileSync(file, JSON.stringify(data, null, 2));

  res.json({ ok: true, message: "Tareas guardadas" });
});

// ====== SERVER ======
app.listen(PORT, () => {
  console.log("Servidor listo en puerto " + PORT);
});