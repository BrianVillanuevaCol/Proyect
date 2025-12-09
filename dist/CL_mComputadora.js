// Clase Modelo que representa una sola computadora
export class CL_mComputadora {
    constructor(numeroSerie, // Identificador único
    procesador, // Ej: i5, i7
    memoria, // Ej: 4GB, 8GB
    laboratorio, // Número de laboratorio (1-6)
    estado, // Estado actual (usando el tipo definido arriba)
    fila, // Ubicación física: Fila
    puesto // Ubicación física: Puesto
    ) {
        this.numeroSerie = numeroSerie;
        this.procesador = procesador;
        this.memoria = memoria;
        this.laboratorio = laboratorio;
        this.estado = estado;
        this.fila = fila;
        this.puesto = puesto;
    }
    // Método auxiliar para obtener un texto resumen de la PC (útil para logs o debugging)
    obtenerResumen() {
        return `Lab ${this.laboratorio} - Fila ${this.fila} / Puesto ${this.puesto} (Serial: ${this.numeroSerie}) - Estado: ${this.estado}`;
    }
}
