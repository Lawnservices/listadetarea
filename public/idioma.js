
function obtenerIdioma() {
  try {
    return localStorage.getItem("idioma") === "en" ? "en" : "es";
  } catch (error) {
    return "es";
  }
}

const textosIdioma = {
  es: {
    entrar: "Iniciar sesión",
    registrarse: "Crear cuenta",
    email: "Correo electrónico",
    password: "Contraseña",
    nombre: "Nombre de usuario",
    botonLogin: "Entrar",
    botonRegister: "Registrarme",
    sinCuenta: "¿No tienes cuenta?",
    conCuenta: "¿Ya tienes cuenta?",
    enlaceRegistro: "Crear una cuenta",
    enlaceLogin: "Iniciar sesión",
    volver: "Volver al inicio",
    titulo: "Lista de Tareas",
    vamos: "¡Vamos a lograr cosas hoy!",
    agrega: "Agrega tus tareas y mantente al día"
  },
  en: {
    entrar: "Log in",
    registrarse: "Create an account",
    email: "Email address",
    password: "Password",
    nombre: "Username",
    botonLogin: "Log in",
    botonRegister: "Sign up",
    sinCuenta: "Don't have an account?",
    conCuenta: "Already have an account?",
    enlaceRegistro: "Create an account",
    enlaceLogin: "Log in",
    volver: "Back to home",
    titulo: "To-Do List",
    vamos: "Let’s get things done today!",
    agrega: "Add your tasks and stay up to date"
  }
};

function aplicarIdioma() {
  const idioma = obtenerIdioma();
  const textos = textosIdioma[idioma];

  document.documentElement.lang = idioma;

  document.querySelectorAll("[data-idioma-texto]").forEach(elemento => {
    const clave = elemento.dataset.idiomaTexto;

    if (textos[clave] !== undefined) {
      elemento.textContent = textos[clave];
    }
  });

  document.querySelectorAll("[data-idioma-placeholder]").forEach(elemento => {
    const clave = elemento.dataset.idiomaPlaceholder;

    if (textos[clave] !== undefined) {
      elemento.placeholder = textos[clave];
    }
  });
}

document.addEventListener("DOMContentLoaded", aplicarIdioma);
