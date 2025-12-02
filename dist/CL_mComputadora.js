export class CL_mComputadora {
    constructor(numeroSerie, // Alfanumérico (Input: Text)
    procesador, memoria, laboratorio, // Laboratorio ahora es numérico (Input: Number)
    estado, fila, // Fila (1-8)
    puesto // Puesto (1-4)
    ) {
        this.numeroSerie = numeroSerie;
        this.procesador = procesador;
        this.memoria = memoria;
        this.laboratorio = laboratorio;
        this.estado = estado;
        this.fila = fila;
        this.puesto = puesto;
    }
    obtenerResumen() {
        return `Lab ${this.laboratorio} - Fila ${this.fila} / Puesto ${this.puesto} (Serial: ${this.numeroSerie}) - Estado: ${this.estado}`;
    }
}
