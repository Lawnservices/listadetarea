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

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js")
            .then(() => console.log("Service Worker registrado"))
            .catch(error => console.log("Error:", error));
    });
}

// const btn = document.getElementById("installBtn");

// if (btn) {
//     btn.addEventListener("click", async () => {
//         if (!deferredPrompt) return;

//         deferredPrompt.prompt();

//         const choice = await deferredPrompt.userChoice;

//         if (choice.outcome === "accepted") {
//             console.log("App instalada");
//         }

//         deferredPrompt = null;
//         btn.style.display = "none";
//     });
// }