// ARCHIVO: CL_index.ts
import { Controlador } from "./CL_controlador.js";
document.addEventListener('DOMContentLoaded', () => {
    try {
        new Controlador();
        console.log("Aplicación de Gestión de Decanato iniciada correctamente.");
    }
    catch (error) {
        console.error("Fallo al inicializar la aplicación. Revisa las referencias DOM.", error);
    }
});
