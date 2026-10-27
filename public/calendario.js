
 
(function () {
    "use strict";

    const textos = {
        "Mi calendario mensual": "My Monthly Calendar",
        "Organiza tus citas, tareas, pagos y objetivos. Selecciona cualquier día para añadir un evento.": "Organize your appointments, tasks, payments, and goals. Select any day to add an event.",
        "Mes anterior": "Previous month",
        "Mes siguiente": "Next month",
        "Ir a hoy": "Go to today",
        "Eventos del mes": "Events this month",
        "Días con actividades": "Days with activities",
        "Eventos pendientes": "Pending events",
        "Recordatorios del mes": "Monthly reminders",
        "Selecciona un día para crear o revisar tus recordatorios.": "Select a day to create or review your reminders.",
        "↻ Actualizar calendario": "↻ Refresh calendar",
        "🖨️ Imprimir / Guardar PDF": "🖨️ Print / Save PDF",
        "Conectando con el servidor...": "Connecting to the server...",
        "Añadir evento": "Add event",
        "Editar evento": "Edit event",
        "Nombre del evento": "Event name",
        "Ej. Pagar la electricidad": "E.g. Pay the electricity bill",
        "Hora": "Time",
        "Categoría": "Category",
        "Personal": "Personal",
        "Trabajo": "Work",
        "Importante": "Important",
        "Evento completado": "Event completed",
        "Guardar evento": "Save event",
        "Cancelar": "Cancel",
        "Eliminar": "Delete",
        "Editar": "Edit",
        "Todavía no hay eventos este mes.": "There are no events this month yet.",
        "Escribe el nombre del evento.": "Enter the event name.",
        "¿Seguro que quieres eliminar este evento?": "Are you sure you want to delete this event?",
        "Guardando en {..}...": "Saving...",
        "Eliminando evento...": "Deleting event...",
        "No se encontró ese evento. Actualiza el calendario.": "Event not found. Refresh the calendar.",
        "No se pudo conectar con el servidor. Comprueba tu conexión y la configuración CORS de la API.": "Could not connect to the server. Check your connection and the API's CORS settings.",
        "El servidor no devolvió una respuesta JSON válida.": "The server did not return a valid JSON response.",
        "Debes iniciar sesión.": "You must log in.",
        "Tu sesión ha expirado. Inicia sesión de nuevo.": "Your session has expired. Please log in again.",
        "No se pudo verificar la sesión. Recarga la página.": "Could not verify your session. Reload the page.",
        "Eventos cargados correctamente desde {..}...": "Events loaded successfully.",
        "Evento guardado correctamente en {..}.": "Event saved successfully.",
        "Evento eliminado correctamente de {..}...": "Event deleted successfully.",
        "No se pudo iniciar el calendario:": "Could not start the calendar:",
        "← Mis tareas": "← My tasks",
        "Inicio": "Home",
        "Lun": "Mon",
        "Mar": "Tue",
        "Mié": "Wed",
        "Jue": "Thu",
        "Vie": "Fri",
        "Sáb": "Sat",
        "Dom": "Sun",
        "Enero": "January",
        "Febrero": "February",
        "Marzo": "March",
        "Abril": "April",
        "Mayo": "May",
        "Junio": "June",
        "Julio": "July",
        "Agosto": "August",
        "Septiembre": "September",
        "Octubre": "October",
        "Noviembre": "November",
        "Diciembre": "December",
        "© 2026 ListaDeTareas · Organiza tu tiempo.": "© 2026 ListaDeTareas · Organize your time."
    };

    const idioma = (() => {
        try {
            return localStorage.getItem("idioma") === "en" ? "en" : "es";
        } catch {
            return "es";
        }
    })();

    document.documentElement.lang = idioma;

    if (idioma === "en") {
        document.title = "Monthly Calendar | ListaDeTareas";

        const originalMesAnio = document.getElementById("mesAnio");

        function traducirTexto(texto) {
            const limpio = texto.replace(/\s+/g, " ").trim();
            return textos[limpio] || texto;
        }

        function traducirPagina() {
            const elementos = document.querySelectorAll(
                "h1, h2, p, a, button, label, option, span, footer, .estadistica"
            );

            elementos.forEach(elemento => {
                // Traducir solamente el texto propio del elemento.
                elemento.childNodes.forEach(nodo => {
                    if (nodo.nodeType === Node.TEXT_NODE) {
                        nodo.textContent = traducirTexto(nodo.textContent);
                    }
                });

                if (elemento.hasAttribute("placeholder")) {
                    elemento.placeholder = traducirTexto(elemento.placeholder);
                }

                if (elemento.hasAttribute("aria-label")) {
                    elemento.setAttribute(
                        "aria-label",
                        traducirTexto(elemento.getAttribute("aria-label"))
                    );
                }
            });

            // Traducir el nombre del mes, sin modificar el año.
            if (originalMesAnio) {
                originalMesAnio.textContent =
                    traducirTexto(originalMesAnio.textContent);
            }
        }

        traducirPagina();

        // Traduce también los textos que el calendario genere después.
        const observador = new MutationObserver(() => {
            traducirPagina();
        });

        observador.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });

        // Usar fechas en inglés para los recordatorios y el modal.
        const fechaBonitaOriginal = window.fechaBonita;

    } else {
        document.title = "Calendario Mensual | ListaDeTareas";
    }
})();
 
