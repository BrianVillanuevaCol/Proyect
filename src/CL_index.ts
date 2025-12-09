import { Controlador } from "./CL_controlador.js";

// Espera a que el DOM esté listo antes de arrancar la app
document.addEventListener('DOMContentLoaded', () => {
    try {
        new Controlador(); // Inicia el controlador principal
        console.log("Aplicación de Gestión de Decanato iniciada correctamente.");
    } catch (error) {
        console.error("Fallo al inicializar la aplicación. Revisa las referencias DOM.", error);
    }
});